import React, { useState } from "react";
import { useQuery } from "urql";

type AnimationCardProps = {
  cursor: string;
  node: {
    name: string;
    gifUrl: string;
  };
};

const AnimationCard: React.FC<AnimationCardProps> = ({ node }) => (
  <div className="p-4 border rounded-lg shadow-md">
    <img src={node.gifUrl} alt={node.name} className="w-16 h-16 mx-auto" />
    <div className="mt-4 text-center">
      <h3 className="text-lg font-semibold">{node.name}</h3>
    </div>
  </div>
);

const ANIMATIONS_QUERY = `
  {
  getAnimations {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        bgColor
        comments {
          content
          createdAt
          frame
        }
        commentsCount
        createdAt
        createdByUserId
        description
        downloads
        gifFileSize
        gifUrl
        id
        imageFileSize
        imageFrame
        imageUrl
        isLiked
        likesCount
        lottieFileSize
        lottieFileType
        lottieUrl
        jsonUrl
        lottieVersion
        name
        publishedAt
        slug
        sourceFileName
        sourceFileSize
        sourceFileType
        sourceFileUrl
        sourceName
        sourceVersion
        speed
        status
        updatedAt
        url
        videoFileSize
        videoUrl
        isCanvaCompatible
        createdBy {
          city
          githubUsername
        }
      }
    }
  }
}
`;

function App() {
  const [result] = useQuery({
    query: ANIMATIONS_QUERY,
  });

  const { data, fetching, error } = result;

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  if (fetching) return <p>Loading...</p>;
  if (error) {
    if (error.message === "[Network] Failed to fetch") {
    }
  }

  console.log(data);

  const totalPages = data
    ? Math.ceil(data.getAnimations.edges.length / itemsPerPage)
    : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedAnimations = data
    ? data.getAnimations.edges.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Recently uploaded</h3>
        <button className="bg-teal-500 text-white py-2 px-4 rounded">
          Upload animations
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedAnimations.map((selected: AnimationCardProps) => (
          <AnimationCard key={selected.cursor} {...selected} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
