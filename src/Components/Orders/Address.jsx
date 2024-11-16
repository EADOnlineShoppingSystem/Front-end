import { useState } from "react";
import { PlusCircle, Trash2, Edit2, X } from "lucide-react";
import NavBar from "../NavBar/NavBar";

const Address = () => {
  // Move addresses to state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      street: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedAddress(null);
    setShowModal(true);
  };

  const handleEdit = (address) => {
    setModalMode("edit");
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  // handle setting default address
  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
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

        <form
          className="p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newAddress = {
              id: selectedAddress?.id || Date.now(),
              name: formData.get("name"),
              street: formData.get("street"),
              city: formData.get("city"),
              state: formData.get("state"),
              zip: formData.get("zip"),
              phone: formData.get("phone"),
              isDefault: selectedAddress?.isDefault || false,
            };

            if (modalMode === "add") {
              setAddresses((prev) => [...prev, newAddress]);
            } else {
              setAddresses((prev) =>
                prev.map((addr) =>
                  addr.id === selectedAddress.id ? newAddress : addr
                )
              );
            }
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={selectedAddress?.phone || ""}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                defaultValue={selectedAddress?.state || ""}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                name="zip"
                defaultValue={selectedAddress?.zip || ""}
                className="mt-1 block w-full rounded-md border-2 border-blue-100 px-2 py-1 text-md text-gray-500 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-300"
                required
              />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
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
                {address.isDefault && (
                  <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
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
            {!address.isDefault && (
              <button
                onClick={() => handleSetDefault(address.id)}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700"
              >
                Set as default
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && <AddressModal />}
    </div>
  );
};

export default Address;
