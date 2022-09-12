import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonProps = PropsWithChildren<{
  disabled: boolean;
  handleClick: Function;
  width?: 'full' | 'content';
}>;

const Button: React.FC<ButtonProps> = ({
  handleClick,
  children,
  disabled,
  width
}) => {
  const _handleClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    handleClick();
  };

  return (
    <button
      disabled={disabled}
      onClick={(e) => _handleClick(e)}
      className={clsx(
        width && width == 'full' && 'w-full',
        'px-4',
        'py-2',
        'bg-blue-600',
        'border-0',
        'rounded',
        'text-sm',
        'text-gray-100',
        'font-semibold',
        'hover:bg-blue-800',
        'focus:outline-none',
        'disabled:opacity-50'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
