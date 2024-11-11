import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error", error.message);
    throw error("Cabins could not be found");
  }

  return data;
}
