import React from 'react';
import Image from 'next/image';
import { MdMovie, MdAccessTime } from 'react-icons/md'; // Import icons
import { Project } from '@/types';
import { getTimeAgo } from '@/lib/common/time';

interface ProjectSingleProps {
  project: Project;
  onClick: (id: string, status: string) => void;
}

export const ProjectSingle: React.FC<ProjectSingleProps> = ({ project, onClick }) => {
  return (
    <div
      className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md 
                 transition-all duration-200 cursor-pointer"
      onClick={() => onClick(project.id, project.status)}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video">
        {project.signed_url_image ? (
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
        )}

        {/* Processing Overlay */}
        {project.status === "processing" && (
          <div className="absolute inset-0 bg-secondary bg-opacity-60 backdrop-blur-sm 
                         flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-muted border-t-primary 
                            rounded-full animate-spin mb-4" />

              {/* Status Text */}
              <div className="bg-secondary bg-opacity-75 rounded-lg px-6 py-3 
                            min-w-[160px] text-center">
                <p className="text-secondary-text text-sm font-medium mb-1">
                  Processing...
                </p>
                <p className="text-muted text-xs">
                  {project.remainingTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-4">
        <p className="text-xs text-background-text flex items-center">
          <MdAccessTime className="h-4 w-4 mr-1" />
          {project.updation_time
            ? getTimeAgo(project.updation_time.toDate())
            : "Unknown time"}
        </p>
      </div>
    </div>
  );
};
