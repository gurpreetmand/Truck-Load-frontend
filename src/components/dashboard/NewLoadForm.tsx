import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  DollarSign,
  MapPin,
  Calendar,
  Info,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  dimensions: z.string().min(1, { message: "Dimensions are required" }),
  pickupLocation: z.string().min(5, { message: "Pickup location is required" }),
  deliveryLocation: z
    .string()
    .min(5, { message: "Delivery location is required" }),
  pickupDate: z.string().min(1, { message: "Pickup date is required" }),
  deliveryDate: z.string().min(1, { message: "Delivery date is required" }),
  loadType: z.string().min(1, { message: "Load type is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});

interface NewLoadFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean;
}

const NewLoadForm = ({
  onSubmit = () => {},
  isSubmitting = false,
}: NewLoadFormProps) => {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      weight: "",
      dimensions: "",
      pickupLocation: "",
      deliveryLocation: "",
      pickupDate: "",
      deliveryDate: "",
      loadType: "",
      price: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-700">
          Post New Load
        </CardTitle>
        <CardDescription>
          Fill out the form below to create a new load for truckers to bid on.
        </CardDescription>
        <div className="flex justify-between mt-4">
          <div
            className={`flex items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}
          >
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step >= 1 ? "bg-blue-100" : "bg-gray-100"}`}
            >
              <Package className="h-4 w-4" />
            </div>
            <span>Load Details</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2" />
          <div
            className={`flex items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}
          >
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step >= 2 ? "bg-blue-100" : "bg-gray-100"}`}
            >
              <MapPin className="h-4 w-4" />
            </div>
            <span>Locations</span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2" />
          <div
            className={`flex items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}
          >
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step >= 3 ? "bg-blue-100" : "bg-gray-100"}`}
            >
              <DollarSign className="h-4 w-4" />
            </div>
            <span>Pricing</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Load Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Furniture Shipment from NYC to LA"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A clear title helps truckers understand your load at a
                        glance.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide details about your load..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include any special handling instructions or
                        requirements.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (lbs)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 5000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensions (L×W×H in)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 48×40×48" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="loadType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Load Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select load type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full_truckload">
                            Full Truckload (FTL)
                          </SelectItem>
                          <SelectItem value="less_than_truckload">
                            Less Than Truckload (LTL)
                          </SelectItem>
                          <SelectItem value="partial_truckload">
                            Partial Truckload (PTL)
                          </SelectItem>
                          <SelectItem value="refrigerated">
                            Refrigerated
                          </SelectItem>
                          <SelectItem value="flatbed">Flatbed</SelectItem>
                          <SelectItem value="hazardous">
                            Hazardous Materials
                          </SelectItem>
                          <SelectItem value="oversized">
                            Oversized Load
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the type of load you're shipping.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center text-blue-700">
                      <MapPin className="mr-2 h-5 w-5" />
                      Pickup Information
                    </h3>
                    <FormField
                      control={form.control}
                      name="pickupLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center text-blue-700">
                      <Truck className="mr-2 h-5 w-5" />
                      Delivery Information
                    </h3>
                    <FormField
                      control={form.control}
                      name="deliveryLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deliveryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <h3 className="font-medium text-blue-700">
                        Pricing Tips
                      </h3>
                      <p className="text-sm text-blue-600">
                        Set competitive rates based on distance, weight, and
                        current market conditions. Our AI calculator can help
                        you determine fair pricing.
                      </p>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            type="number"
                            className="pl-9"
                            placeholder="0.00"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter your asking price. Truckers may bid below this
                        amount.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h3 className="font-medium text-orange-700 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Load Summary
                  </h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <span className="text-gray-600">Load Type:</span>
                      <span className="font-medium">
                        {form.watch("loadType")
                          ? form
                              .watch("loadType")
                              .replace("_", " ")
                              .toUpperCase()
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">
                        {form.watch("weight") || "Not specified"} lbs
                      </span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-600">Pickup:</span>
                      <span className="font-medium">
                        {form.watch("pickupDate") || "Not specified"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">
                        {form.watch("deliveryDate") || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="flex items-center"
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Publishing..." : "Publish Load"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewLoadForm;
