import React, { useState } from 'react';

type BadgeType = {
  label?: string;
  color?: 'badge-primary' | 'badge-secondary' | 'badge-accent'
}

export default function Badge({label, color} : BadgeType) {
  return (
    <span
      className={`text-sm px-1 rounded-full whitespace-nowrap ${color}`}
    >{label}
    </span>
  );
}
