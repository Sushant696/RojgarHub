import { UserCog, Briefcase, Trash2 } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLogout } from "@/hooks/auth";

function Setting() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate } = useLogout();
  const handleDeleteAccount = () => {
    mutate();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Settings</h1>

      <Card className="border border-blue-100 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <CardTitle>Job Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Remote Jobs</h3>
              <p className="text-sm text-gray-600">
                Show remote opportunities first
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Salary Range Visibility</h3>
              <p className="text-sm text-gray-600">
                Display your expected salary range
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border border-blue-100 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCog className="w-6 h-6 text-blue-600" />
            <CardTitle>Data Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <button
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your account and all associated data
              will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Setting;
