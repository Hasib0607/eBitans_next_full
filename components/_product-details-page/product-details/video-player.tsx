const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  // Convert the normal YouTube URL to an embeddable one
  const videoId = videoUrl?.split("v=")[1]; // Extract video ID from the URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="500"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
};

export default VideoPlayer;
