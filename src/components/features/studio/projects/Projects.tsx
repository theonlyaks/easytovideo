"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MdAdd, MdMovie } from "react-icons/md";
import { useProjectUpdates, useProjects } from "@/store";
import ProjectSingle from "@/components/common/ProjectSingle"; // Import default
import { SkeletonLoader } from "@/components/common/SkeletonProjectLoader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QuickActions } from "@/components/common/QuickActions";
import { AuthState } from "@/types";
export function ProjectListComponent({ user }: AuthState) {
  const [filter, setFilter] = useState<"all" | "effects" | "subtitle">("all");
    
  const { projects, loading } = useProjects(user);
  const updatedProjects = useProjectUpdates(projects);
  const router = useRouter();

  const handleProjectClick = (projectId: string, status: string, type: string | undefined) => {
    if (status !== "processing" && type) {
      if (type === "subtitle") {
        router.push(`/studio/subtitle/${projectId}/edit`);
      } else {
        router.push(`/studio/effects/${projectId}/output`);
      }
    }
  };


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as "all" | "effects" | "subtitle");
  };

  const filteredProjects = updatedProjects.filter(project => 
    filter === "all" || project.type === filter
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <QuickActions
          onCreateAiEffect={() => router.push("/studio/effects")}
        />

        <SectionHeader
          title="Recent Projects"
          subtitle="Transform your content into engaging videos with AI-powered editing tools"
          filter={filter}
          onFilterChange={handleFilterChange}
        />

        {loading ? (
          <SkeletonLoader />
        ) : !filteredProjects || filteredProjects.length === 0 ? (
          <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <MdMovie className="h-24 w-24 text-gray-400" />
            </div>
            <button
              onClick={() => router.push("/studio/effects")}
              className="inline-flex items-center px-6 py-3 border border-transparent 
                       text-base font-medium rounded-md shadow-sm text-primary-text 
                       bg-primary hover:bg-opacity-90 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                       transition-colors duration-200"
            >
              <MdAdd className="mr-2 -ml-1 h-5 w-5" />
              Create New Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <ProjectSingle
                key={project.id}
                project={project}
                onClick={(id, status) => handleProjectClick(id, status, project?.type)}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
