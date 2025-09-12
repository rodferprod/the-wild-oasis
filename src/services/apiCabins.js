import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function deleteCabin(cabin) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", cabin.id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	if (cabin.image) {
		const image = cabin.image.split("/").pop();
		await supabase.storage.from("cabin-images").remove([image]);
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	// For creation action we'll not have an image
	let hasImageURL = false;

	// 1. Check if it is an edit action and if image didn't changes
	if (id)
		hasImageURL = typeof newCabin.image === "string" && newCabin.image === newCabin.actualImage;

	let imageURL = "",
		imageName = "",
		actualImage = null;

	if (hasImageURL) {
		// 1.1 Maintain existing image
		imageURL = newCabin.image;
	} else {
		// 1.2 Create unique image name and URL
		imageName = `${Math.random()}_${newCabin.image.name}`.replaceAll("/", "");
		imageURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
		// Get old image if it exists
		actualImage = newCabin?.actualImage;
	}

	// As this field is not in the cabins table, we need to remove it
	if (newCabin?.actualImage) delete newCabin.actualImage;

	// 2. Create/Edit Cabin
	let query = supabase.from("cabins");

	// 2.1. Create
	if (!id) query = query.insert([{ ...newCabin, image: imageURL }]);

	// 2.2 Edit
	if (id) query = query.update({ ...newCabin, image: imageURL }).eq("id", id);

	const { data, error } = await query;

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	// Keeps image if it already exists
	if (hasImageURL) {
		return data;
	} else {
		// 3. Upload image if there is a new image
		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, newCabin.image);

		// 4. Delete cabin if image upload fails
		if (storageError) {
			await supabase.from("cabins").delete().eq("id", data.id);
			console.error(storageError);
			throw new Error("Cabin image could not be uploaded and the cabin was not created");
		}

		// 5. Delete old image if it exists
		if (actualImage) {
			const oldImageName = actualImage.split("/").pop();
			await supabase.storage.from("cabin-images").remove([oldImageName]);
		}

		return data;
	}
}
