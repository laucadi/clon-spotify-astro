import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({ params, request }) {
  //traer la id de la url de los search params
  const { url } = request;
  //1 forma de hacerlo
  //   const[,querystring] = url.split("?")
  //   const searchParams = new URL(url).searchParams(querystring);
  //2 forma de hacerlo
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");
  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);
  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  });
}
