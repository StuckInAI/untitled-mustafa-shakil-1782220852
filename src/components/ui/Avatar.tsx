import { getInitials, getAvatarColor, cn } from '@/lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

interface AvatarProps {
  id: string;
  firstName: string;
  lastName: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ id, firstName, lastName, size = 'md', className }: AvatarProps) {
  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0', getAvatarColor(id), sizeMap[size], className)}>
      {getInitials(firstName, lastName)}
    </div>
  );
}
