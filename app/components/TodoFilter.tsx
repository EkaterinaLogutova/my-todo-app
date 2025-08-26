'use client';

import React from 'react';

interface TodoFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FILTER_NAMES = ['All', 'Active', 'Completed'];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div>
      {FILTER_NAMES.map(name => (
        <button
          key={name}
          onClick={() => setFilter(name)}
          disabled={filter === name}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
