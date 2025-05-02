import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';

const ActiveCollaborators = () => {
  const others = useOthers();
  const collaborators = others.map((other) => other.info);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, image, name, color }) => (
        <li key={id}>
        <Image 
          src={image?.trim() ? image : '/assets/data/am.png'}
          alt={name || 'User'}
          width={100}
          height={100}
          className='inline-block size-12 rounded-full ring-2 ring-dark-100'
          style={{ border: `3px solid ${color}` }}
        />

        </li>
      ))}
    </ul>
  )
}

export default ActiveCollaborators