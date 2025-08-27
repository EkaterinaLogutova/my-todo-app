"use client";

import React from "react";
import styles from './TodoFilter.module.scss';

type FilterType = "All" | "Active" | "Completed";

interface TodoFilterProps {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

const FILTER_NAMES: FilterType[] = ["All", "Active", "Completed"];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div>
      {FILTER_NAMES.map((name) => (
        <button
          key={name}
          onClick={() => setFilter(name)}
          className={
            filter === name ? styles.filterButtonsActive : styles.filterButtons
          }
        >
          {name}
        </button>
      ))}
    </div>
  );
}
