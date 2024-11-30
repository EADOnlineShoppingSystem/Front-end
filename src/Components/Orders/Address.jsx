import { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Edit2,
  X,
  Briefcase,
  Home,
  CheckCircle,
} from "lucide-react";
import NavBar from "../NavBar/NavBar";
import orderServices from "../../Services/order.services";
import { message, Spin } from 'antd';
const Address = () => {
  // const [addresses, setAddresses] = useState([
  //   {
  //     id: 1,
  //     name: "Jaden Johnson",
  //     street: "123 Main St",
  //     city: "San Francisco",
  //     state: "CA",
  //     zip: "94105",
  //     phone: "(555) 123-4567",
  //     isDefault: true,
  //     isProfessional: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     street: "456 Market St",
  //     city: "San Francisco",
  //     state: "CA",
  //     zip: "94102",
  //     phone: "(555) 987-6543",
  //     isDefault: false,
  //     isProfessional: true,
  //   },
  // ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [errors, setErrors] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedAddress(null);
    setErrors({});
    setShowModal(true);
  };

  //save address 
  const handleSaveAddress = async (address) => {
    try {
        setLoading(true);
        console.log("Saving address:", address);
        await orderServices.createAddress(address);
        await fetchAddresses(); // Fetch updated addresses
        message.success('Address saved successfully');
        setShowModal(false);
        setLoading(false);
    } catch (error) {
        console.error("Error saving address:", error);
        message.error(error.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  //fetch address from database
   const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await orderServices.getAddressById();
      setAddresses(response);
      console.log("Fetched addresses:", response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);


  const handleEdit = (address) => {
    setModalMode("edit");
    setSelectedAddress(address);
    setErrors({});
    setShowModal(true);
  };

  // const handleDelete = (id) => {
  //   setAddresses(addresses.filter((address) => address._id !== id));
  // };

  //delete address from database
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(id);
      await orderServices.deleteAddressByUserId(id);
      message.success('Address deleted successfully');
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      message.error(error.message || 'Failed to delete address');
    }
    finally {
      setDeleteLoading(null);
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address._id === id,
      }))
    );
  };

  const handleUseAddress = (address) => {
    // Add your checkout logic here
    console.log("Using address for checkout:", address);
  };

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    const name = formData.get("name").trim();
    if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      newErrors.name =
        "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Phone validation
    const phone = formData.get("phone").trim();
    const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
   if (!phoneRegex.test(phone)) {
     newErrors.phone = "Phone number must contain exactly 10 digits.";
}


    // Street validation
    const street = formData.get("street").trim();
    if (street.length < 5) {
      newErrors.street = "Street address must be at least 5 characters long";
    }

    // City validation
    const city = formData.get("city").trim();
    if (!/^[a-zA-Z\s'-]+$/.test(city)) {
      newErrors.city =
        "City can only contain letters, spaces, hyphens, and apostrophes";
    }

    // State validation
    const state = formData.get("state").trim();
    if (!/^[A-Z]{2}$/.test(state)) {
      newErrors.state = "State must be a 2-letter code (e.g., CA)";
    }

    // ZIP validation
    const zip = formData.get("zip").trim();
    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      newErrors.zip =
        "ZIP must be 5 digits or 5+4 format (e.g., 12345 or 12345-6789)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {modalMode === "add" ? "Add New Address" : "Edit Address"}
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <Spin spinning={loading}>
        <form
          className="p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            

            if (!validateForm(formData)) {
              return;
            }

            const newAddress = {
              name: formData.get("name").trim(),
              street: formData.get("street").trim(),
              city: formData.get("city").trim(),
              state: formData.get("state").trim().toUpperCase(),
              zip: formData.get("zip").trim(),
              phone: formData.get("phone").trim(),
              isDefault: selectedAddress?.isDefault || false,
              isProfessional: formData.get("isProfessional") === "true",
            };
            console.log("saveksabd",newAddress);

            handleSaveAddress(newAddress)

            // if (modalMode === "add") {
            //   setAddresses((prev) => [...prev, newAddress]);
            // } else {
            //   setAddresses((prev) =>
            //     prev.map((addr) =>
            //       addr.id === selectedAddress.id ? newAddress : addr
            //     )
            //   );
            // }
            setShowModal(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={selectedAddress?.name || ""}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={selectedAddress?.phone || ""}
                placeholder="(XXX) XXX-XXXX"
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                defaultValue={selectedAddress?.street || ""}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                defaultValue={selectedAddress?.city || ""}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                defaultValue={selectedAddress?.state || ""}
                placeholder="CA"
                maxLength={2}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="number"
                name="zip"
                defaultValue={selectedAddress?.zip || ""}
                placeholder="12345 or 12345-6789"
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isProfessional"
                  value="true"
                  defaultChecked={selectedAddress?.isProfessional}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Business Address
                </span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {modalMode === "add" ? "Save Address" : "Update Address"}
            </button>
          </div>
        </form>
        </Spin>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 mt-10">
      <div>
        <NavBar />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Address
        </button>
      </div>

      <Spin spinning={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className={`p-4 rounded-lg border ${
              address.isDefault
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            } relative`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {address.name}
                </span>
                <div className="flex space-x-2">
                  {address.isDefault && (
                    <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                      Default
                    </span>
                  )}
                  {address.isProfessional && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full flex items-center">
                      <Briefcase className="w-3 h-3 mr-1" />
                      Business
                    </span>
                  )}
                  {!address.isProfessional && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full flex items-center">
                      <Home className="w-3 h-3 mr-1" />
                      Residential
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-500">
              <p>{address.street}</p>
              <p>{`${address.city}, ${address.state} ${address.zip}`}</p>
              <p>{address.phone}</p>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address._id)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Set as default
                </button>
              )}
              <button
                onClick={() => handleUseAddress(address)}
                className="flex items-right justify-right px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-400"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Use this address
              </button>
            </div>
          </div>
        ))}
      </div>
      </Spin>

      {showModal && <AddressModal />}
    </div>
  );
};

export default Address;
