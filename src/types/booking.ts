// {
//     "success": true,
//     "message": "Service Request created successfully",
//     "data": {
//         "createdAt": "2025-10-11T06:12:45.789Z",
//         "status": "PENDING",
//         "id": 2,
//         "userId": 2,
//         "serviceProviderId": 3,
//         "packageId": 1,
//         "urgentLevel": 3,
//         "description": "Need service ASAP",
//         "address": "123 Main St",
//         "contactNumber": "0123456789",
//         "preferredDate": "2025-09-25",
//         "preferredTime": "14:30:00",
//         "updatedAt": "2025-10-11T06:12:45.792Z"
//     }
// }


export interface Booking {
  id: number;
  userId: number;
  serviceProviderId: number;
  packageId: number;
  urgentLevel: number;
  description: string;
  address: string;
  contactNumber: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  service_provider_id: number;
  package_id: number;
  user_id: number;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: Booking;
}


export interface BookingRequest {
    userId: number;
    serviceProviderId: number;
    packageId: number;
    urgentLevel: number;
    description: string;
    address: string;
    contactNumber: string;
    preferredDate: string;
    preferredTime: string;
}