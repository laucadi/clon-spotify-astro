import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "./Player";

const CardPlayButton = ({ id, size = "small" }) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);
  const isPlayingPlayilist = isPlaying && currentMusic?.id === id;

  const handleClick = () => {
    if (isPlayingPlayilist) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0], id });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-green-500 p-4 hover:scale-105 hover:bg-green-500"
    >
      {isPlayingPlayilist ? <Pause size={size} /> : <Play size={size} />}
    </button>
  );
};

export default CardPlayButton;
