import axiosInstance from '@/lib/axios';
 
export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const getContacts = async (): Promise<Contact[]> => {
    const response = await axiosInstance.get('/');
    return response.data;
  };

export const getContact = async (id: string | undefined): Promise<Contact> => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data.contact;
  }

