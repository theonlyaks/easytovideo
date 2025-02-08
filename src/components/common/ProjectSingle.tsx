import React from "react";
import Image from "next/image";
import { MdMovie, MdAccessTime, MdCategory, MdError } from "react-icons/md"; // Added MdError icon
import { Project } from "@/types";
import { useStorageUrl } from "@/store/hooks/useStorageUrl";
import {
  getTimeAgo,
  convertToLocalTime,
  formatRelativeTime,
} from "@/lib/common/time";
import { User } from "@/types";

interface ProjectSingleProps {
  project: Project;
  onClick: (id: string, status: string) => void;
  user: User | null;
}

const ProjectSingle: React.FC<ProjectSingleProps> = ({
  project,
  onClick,
  user
}) => {
  const isClickable = project.status === "completed" && project.progress === 100;
  const thumbnailPath = project.thumbnailFilename && user ? 
    `user_files/${user.uid}/${project.thumbnailFilename}` : null;
  const { url: thumbnailUrl } = useStorageUrl(thumbnailPath);

  const renderThumbnail = () => (
    project.status === "completed" && thumbnailUrl ? (
      <Image
        src={thumbnailUrl}
        alt={project.title || "Project thumbnail"}
        width={400}
        height={225}
        className="w-full h-full object-cover"
      />
    ) : project.signed_url_image ? (
      <Image
        src={project.signed_url_image}
        alt={project.title || "Project thumbnail"}
        width={400}
        height={225}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <MdMovie className="h-12 w-12 text-neutral" />
      </div>
    )
  );

  const renderOverlay = () => {
    if (project.status === "failed") {
      return (
        <div className="absolute inset-0 bg-red-500 bg-opacity-60 backdrop-blur-sm 
                       flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <MdError className="h-12 w-12 text-white mb-2" />
            <p className="text-white font-medium">Project Failed</p>
          </div>
        </div>
      );
    }

    if (project.status !== "completed" && project.progress !== 100) {
      return (
        <div className="absolute inset-0 bg-secondary bg-opacity-60 backdrop-blur-sm 
                       flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-3/4 bg-muted rounded-full h-2.5 mb-4">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="bg-secondary bg-opacity-75 rounded-lg px-6 py-3 
                          min-w-[160px] text-center">
              <p className="text-secondary-text text-sm font-medium mb-1">
                {project.statusMessage || 'Processing'}
              </p>
              <p className="text-muted text-xs">{project.remainingTime}</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md 
                 transition-all duration-200 ${isClickable ? "cursor-pointer" : ""}`}
      onClick={() => isClickable && onClick(project.id ?? "", project.status ?? "")}
    >
      <div className="relative" style={{ aspectRatio: '9/16' }}>
        {renderThumbnail()}
        {renderOverlay()}
      </div>

      <div className="p-4">
        <p className="text-md mb-4 text-background-text flex items-center">
          {project.title || "Untitled"}
        </p>
        <div className="flex justify-between">
          <p className="text-xs text-background-text flex items-center">
            <MdAccessTime className="h-4 w-4 mr-1" />
            {project.updatedAt
              ? `${formatRelativeTime(convertToLocalTime(project.updatedAt))}`
              : "Unknown time"}
          </p>
          <p className="text-xs text-background-text flex items-center">
            <MdCategory className="h-4 w-4 mr-1" />
            {project.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectSingle);