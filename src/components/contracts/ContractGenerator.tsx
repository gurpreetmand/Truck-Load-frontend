import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Send,
  Edit,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ContractGeneratorProps {
  loadId?: string;
  truckerId?: string;
  loaderId?: string;
  initialData?: {
    loadDetails?: {
      id: string;
      title: string;
      origin: string;
      destination: string;
      weight: string;
      dimensions: string;
      value: string;
      pickupDate: string;
      deliveryDate: string;
    };
    paymentTerms?: {
      amount: string;
      method: string;
      dueDate: string;
    };
    additionalTerms?: string;
  };
  onSave?: (data: any) => void;
  onDownload?: () => void;
  onSend?: (recipients: string[]) => void;
}

const ContractGenerator: React.FC<ContractGeneratorProps> = ({
  loadId = "LD-1234",
  truckerId = "TR-5678",
  loaderId = "LO-9012",
  initialData = {
    loadDetails: {
      id: "LD-1234",
      title: "Furniture Shipment",
      origin: "New York, NY",
      destination: "Boston, MA",
      weight: "1,200 lbs",
      dimensions: "8×6×5 ft",
      value: "$5,000",
      pickupDate: "2023-06-15",
      deliveryDate: "2023-06-17",
    },
    paymentTerms: {
      amount: "$850",
      method: "Direct Deposit",
      dueDate: "3 days after delivery",
    },
    additionalTerms:
      "1. Carrier must provide proof of delivery.\n2. Carrier is responsible for any damages during transit.\n3. Shipper must provide accurate weight and dimensions.\n4. Payment will be processed within 3 business days of delivery confirmation.",
  },
  onSave = () => {},
  onDownload = () => {},
  onSend = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [isEditing, setIsEditing] = useState(false);
  const [contractData, setContractData] = useState(initialData);
  const [copied, setCopied] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleInputChange = (section: string, field: string, value: string) => {
    setContractData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleAdditionalTermsChange = (value: string) => {
    setContractData((prev) => ({
      ...prev,
      additionalTerms: value,
    }));
  };

  const handleSave = () => {
    onSave(contractData);
    setIsEditing(false);
  };

  const handleCopy = () => {
    // In a real app, this would copy the contract text to clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    onDownload();
  };

  const handleSend = () => {
    if (recipientEmail) {
      onSend([recipientEmail]);
      setRecipientEmail("");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Transportation Contract
            </CardTitle>
            <CardDescription>
              Load #{loadId} • Generated on {currentDate}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            {activeTab === "preview" && !isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {activeTab === "preview" && isEditing && (
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="share">Share & Download</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Load Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="load-title">Load Title</Label>
                    <Input
                      id="load-title"
                      value={contractData.loadDetails?.title}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "title",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="load-id">Load ID</Label>
                    <Input
                      id="load-id"
                      value={contractData.loadDetails?.id}
                      onChange={(e) =>
                        handleInputChange("loadDetails", "id", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      value={contractData.loadDetails?.origin}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "origin",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      value={contractData.loadDetails?.destination}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "destination",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={contractData.loadDetails?.weight}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "weight",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={contractData.loadDetails?.dimensions}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "dimensions",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickup-date">Pickup Date</Label>
                    <Input
                      id="pickup-date"
                      type="date"
                      value={contractData.loadDetails?.pickupDate}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "pickupDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-date">Delivery Date</Label>
                    <Input
                      id="delivery-date"
                      type="date"
                      value={contractData.loadDetails?.deliveryDate}
                      onChange={(e) =>
                        handleInputChange(
                          "loadDetails",
                          "deliveryDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-amount">Payment Amount</Label>
                    <Input
                      id="payment-amount"
                      value={contractData.paymentTerms?.amount}
                      onChange={(e) =>
                        handleInputChange(
                          "paymentTerms",
                          "amount",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Input
                      id="payment-method"
                      value={contractData.paymentTerms?.method}
                      onChange={(e) =>
                        handleInputChange(
                          "paymentTerms",
                          "method",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-due">Payment Due</Label>
                    <Input
                      id="payment-due"
                      value={contractData.paymentTerms?.dueDate}
                      onChange={(e) =>
                        handleInputChange(
                          "paymentTerms",
                          "dueDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-terms">
                  Additional Terms & Conditions
                </Label>
                <Textarea
                  id="additional-terms"
                  value={contractData.additionalTerms}
                  onChange={(e) => handleAdditionalTermsChange(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">
                  TRANSPORTATION SERVICES AGREEMENT
                </h2>
                <p className="text-gray-500">
                  Contract #{loadId}-{truckerId.split("-")[1]}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">SHIPPER:</h3>
                    <p>Loader ID: {loaderId}</p>
                    <p>Address: {contractData.loadDetails?.origin}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">CARRIER:</h3>
                    <p>Trucker ID: {truckerId}</p>
                    <p>DOT Number: 12345678</p>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                  <h3 className="font-semibold mb-2">LOAD DETAILS:</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-gray-500">Load ID:</span>{" "}
                      {contractData.loadDetails?.id}
                    </div>
                    <div>
                      <span className="text-gray-500">Description:</span>{" "}
                      {contractData.loadDetails?.title}
                    </div>
                    <div>
                      <span className="text-gray-500">Origin:</span>{" "}
                      {contractData.loadDetails?.origin}
                    </div>
                    <div>
                      <span className="text-gray-500">Destination:</span>{" "}
                      {contractData.loadDetails?.destination}
                    </div>
                    <div>
                      <span className="text-gray-500">Weight:</span>{" "}
                      {contractData.loadDetails?.weight}
                    </div>
                    <div>
                      <span className="text-gray-500">Dimensions:</span>{" "}
                      {contractData.loadDetails?.dimensions}
                    </div>
                    <div>
                      <span className="text-gray-500">Pickup Date:</span>{" "}
                      {formatDate(contractData.loadDetails?.pickupDate || "")}
                    </div>
                    <div>
                      <span className="text-gray-500">Delivery Date:</span>{" "}
                      {formatDate(contractData.loadDetails?.deliveryDate || "")}
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 py-4">
                  <h3 className="font-semibold mb-2">PAYMENT TERMS:</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-gray-500">Amount:</span>{" "}
                      {contractData.paymentTerms?.amount}
                    </div>
                    <div>
                      <span className="text-gray-500">Method:</span>{" "}
                      {contractData.paymentTerms?.method}
                    </div>
                    <div>
                      <span className="text-gray-500">Due:</span>{" "}
                      {contractData.paymentTerms?.dueDate}
                    </div>
                  </div>
                </div>

                <div className="py-4">
                  <h3 className="font-semibold mb-2">TERMS AND CONDITIONS:</h3>
                  <div className="whitespace-pre-line text-gray-700">
                    {contractData.additionalTerms}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4">SHIPPER SIGNATURE:</h3>
                      <div className="h-16 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                        Signature required
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Date: _________________
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">CARRIER SIGNATURE:</h3>
                      <div className="h-16 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                        Signature required
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Date: _________________
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="share" className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Download Contract</CardTitle>
                  <CardDescription>
                    Save a copy of this contract to your device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="include-signatures" />
                    <Label htmlFor="include-signatures">
                      Include signature fields
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="include-company-logo" />
                    <Label htmlFor="include-company-logo">
                      Include company logo
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy Text"}
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={handleDownload}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share Contract</CardTitle>
                  <CardDescription>
                    Send this contract to other parties
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-email">Recipient Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="recipient-email"
                        placeholder="email@example.com"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                      />
                      <Button onClick={handleSend} disabled={!recipientEmail}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Label className="mb-2 block">Or share via:</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                        </svg>
                        LinkedIn
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.35 2.75H2.66c-.5 0-.91.41-.91.91v16.68c0 .5.41.91.91.91h18.69c.5 0 .91-.41.91-.91V3.66c0-.5-.41-.91-.91-.91zm-5.96 10.99l-2.33 2.33-4.66-4.66-4.67 4.67V4.58h11.66v9.16z" />
                        </svg>
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full p-3 bg-blue-50 rounded-md text-sm text-blue-700">
                    <p>
                      Recipients will receive a secure link to view and sign
                      this contract.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contract Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
                    <span>Awaiting signatures</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Created on {currentDate}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-gray-500">Shipper signed</span>
                  </div>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-gray-500">Carrier signed</span>
                  </div>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="p-6">
          <div className="space-y-4">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No contract revisions yet
              </h3>
              <p className="text-gray-500 mt-1">
                All contract revisions will appear here
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ContractGenerator;
