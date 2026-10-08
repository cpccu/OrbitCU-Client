'use client';

import React, { useState } from 'react';
import { ResourceVaultTable } from '@/components/resources/ResourceVaultTable';
import { UploadResourceDialog } from '@/components/resources/UploadResourceDialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function ResourcesPage() {
  const { user } = useAuth();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleContributeClick = () => {
    if (!user) {
      toast.error('Please log in with student credentials to upload material.');
      return;
    }
    setUploadDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B]/50 py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        {/* Screen 3 Left: Searchable Academic Vault Table */}
        <ResourceVaultTable onContributeClick={handleContributeClick} />

        {/* Upload Resource Dialog */}
        <UploadResourceDialog
          isOpen={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
          onUploaded={() => {
            toast.success('Your academic resource has been contributed to the vault!');
          }}
        />
      </div>
    </div>
  );
}
