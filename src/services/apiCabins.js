import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	return data;
}

export async function createCabin(newCabin) {
	// 1. Create unique image name and URL
	const imageName = `${Math.random()}_${newCabin.image.name}`.replaceAll("/", "");

	const imageURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 2. Create Cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imageURL }]);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	// 3. Upload image
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error("Cabin image could not be uploaded and the cabin was not created");
	}

	return data;
}
