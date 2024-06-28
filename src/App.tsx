import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import Modal from "./components/Modal";
import Lottie from "react-lottie-player";

type AnimationCardProps = {
  id: string;
  name: string;
  createdAt: string;
  content: {
    content: string;
    metadata: string;
  };
};

const AnimationCard: React.FC<AnimationCardProps> = ({
  name,
  createdAt,
  content,
}) => {
  const animationData = JSON.parse(content.content);
  let metadata = null;
  if (content.metadata) {
    metadata = JSON.parse(content.metadata);
  }
  if (!animationData) return <></>;

  return (
    <div className="p-4 border rounded-lg shadow-md flex flex-col items-center">
      <Lottie
        loop={true}
        animationData={animationData}
        play={true}
        style={{ width: 150, height: 150 }}
      />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-500 text-sm mb-2">Uploaded: {createdAt}</p>
        {metadata && metadata.author && (
          <p className="text-gray-500 text-sm">Author: {metadata.author}</p>
        )}
        {metadata && metadata.keywords && (
          <p className="text-gray-500 text-sm">
            Keywords: {metadata.keywords.join(", ")}
          </p>
        )}
      </div>
      <button
        className="text-teal-500 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mt-4 px-2 py-1 rounded-md"
        onClick={() => {
          const jsonBlob = new Blob([content.content], {
            type: "application/json",
          });
          const url = URL.createObjectURL(jsonBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${name}.json`;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }} // Pass animation ID for download logic
      >
        Download
      </button>
    </div>
  );
};

export const ANIMATIONS_QUERY = /* GraphQL */ `
  query getAnimation($filter: String) {
    getAnimation(filter: $filter) {
      id
      name
      createdAt
      content {
        id
        filename
        filetype
        content
        metadata
      }
    }
  }
`;

const UploadAnimation = /* GraphQL */ `
  mutation uploadAnimation($file: File!) {
    uploadAnimation(file: $file) {
      id
      name
      content {
        id
        filename
        content
      }
    }
  }
`;

function App() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [result] = useQuery({
    query: ANIMATIONS_QUERY,
    requestPolicy: "network-only",
    variables: {
      filter: query,
    },
  });

  const { data, fetching, error } = result;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, uploadAnimation] = useMutation(UploadAnimation);

  if (fetching) return <p>Loading...</p>;
  if (error) {
    if (error.message === "[Network] Failed to fetch") {
    }
  }

  const handleUpload = async (file: File | null) => {
    if (file) uploadAnimation({ file });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase()); // Convert search term to lowercase for case-insensitive search
  };

  const handleSearchSubmit = () => {
    setQuery(searchQuery); // Convert search term to lowercase for case-insensitive search
  };

  return (
    <>
      <div className="pt-8 pl-8 pr-8 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
          <h3 className="text-xl font-semibold mb-4">Recently uploaded</h3>
        </div>
        <div className="flex items-center">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:ring-1 mr-2"
              placeholder="Search animations"
              onChange={handleSearch}
              value={searchQuery}
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <button
            className="bg-teal-500 text-white py-2 px-4 rounded pointer cursor-pointer"
            onClick={openModal}
          >
            Upload animations
          </button>
          <Modal isOpen={isOpen} onClose={closeModal} onUpload={handleUpload} />
        </div>
      </div>
      <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(data ? data.getAnimation : []).map((selected: AnimationCardProps) => (
          <AnimationCard key={selected.id} {...selected} />
        ))}
      </div>
    </>
  );
}

export default App;
