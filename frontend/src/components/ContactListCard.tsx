import { TbListDetails } from "react-icons/tb";
import { MdContactPhone } from "react-icons/md";
import { Link } from "react-router-dom";

export interface ContactType {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }
  
interface ContactListCardProps {
  contact: ContactType;
}

const ContactListCard = ({ contact }: ContactListCardProps) => {
  return (
    <div>
      <article className="rounded-md border border-gray-100 bg-white p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">Contact Name</p>

      <p className="text-2xl font-medium text-gray-900"> {contact.firstName} {contact.lastName}</p>
    </div>

    <span className="rounded-full bg-blue-100 p-3 text-blue-600">
    <MdContactPhone className='w-9 h-9' />

    </span>
  </div>
  <Link to={`/contact/${contact._id}`} >
  <div className="mt-1 flex gap-1 cursor-pointer">
  <TbListDetails  className='text-pink-400'/>
    <p className="flex gap-2 text-xs">     

      <span className="text-gray-500">Click here for more</span>
    </p>
  </div>
  </Link>
</article>
 
    </div>
  )
}

export default ContactListCard
