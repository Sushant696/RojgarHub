import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useUpdateUser } from "@/hooks/auth";
import Loading from "../isLoading";

const contactSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contact: Yup.string()
    .matches(/^\+?[\d\s-]{10,}$/, "Invalid phone number")
    .required("Phone number is required"),
  location: Yup.string().required("Address is required"),
});

const ContactForm = ({ employer }: any) => {
  const userMutation = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      email: employer?.user?.email || "",
      contact: employer?.user?.contact || "",
      location: employer.location || "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      userMutation.mutate({ userId: employer.userId, updateData: values });
    },
  });

  if (userMutation.isPending) {
    return <Loading />;
  }

  return (
    <Card className="border border-blue-100 shadow-lg shadow-blue-50 mt-6">
      <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50/50 to-transparent">
        <CardTitle className="text-2xl font-bold text-blue-950">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.email)}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-blue-900">
                Phone Number
              </Label>
              <Input
                id="contact"
                name="contact"
                onChange={formik.handleChange}
                value={formik.values.contact}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.contact)}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-900">
                Address
              </Label>
              <Input
                id="location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="border-blue-100 focus:border-blue-200 focus:ring-blue-100"
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-400 text-sm">
                  {String(formik.errors.location)}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={userMutation.isPending}
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {userMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default ContactForm;
