import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error", error.message);
    throw error("Cabins could not be found");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Error", error.message);
    throw error("Cabin could not be deleted");
  }

  return data;
}

export async function createAndEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  const { data, error } = await query.select().single();

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  if (error) {
    console.error("Error", error.message);
    throw error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);

    console.error("Error", error.message);
    throw error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
