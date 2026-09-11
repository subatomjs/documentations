'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/**
 * Deliberately shown on every fresh page load while the documentation is in development.
 * The state is kept in memory only, avoiding hydration/session-storage mismatches.
 */
export function DevelopmentNotice() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-2xl p-5 sm:p-6">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border bg-muted">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <DialogTitle>Documentation is in development</DialogTitle>
          <DialogDescription className="pt-2 leading-6">
            The Subatom.js documentation is currently under active development.
            Some pages, APIs, examples, and package references may be incomplete,
            change without notice, or not yet reflect the latest implementation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full sm:w-auto" onClick={() => setOpen(false)}>
            Continue to documentation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
