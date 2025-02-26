import { Bell, Eye, UserCog, Briefcase, Trash2, Download } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function Setting() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Settings</h1>

      <Card className="border border-blue-100 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <CardTitle>Profile Visibility</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Profile Active Status</h3>
              <p className="text-sm text-gray-600">
                Make your profile visible to employers
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Open to Work</h3>
              <p className="text-sm text-gray-600">
                Show employers you're actively looking
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-blue-600" />
          </div>
        </CardContent>
      </Card>

      
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

      <Card className="border border-blue-100 shadow-lg hover:shadow-xl transition-all">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Job Alerts</h3>
              <p className="text-sm text-gray-600">
                Receive notifications for matching jobs
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Application Updates</h3>
              <p className="text-sm text-gray-600">
                Get updates on your applications
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Recruiter Messages</h3>
              <p className="text-sm text-gray-600">
                Allow messages from recruiters
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
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Download className="w-5 h-5" />
              Download My Data
            </button>
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Setting;
