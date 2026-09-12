'use client';

import { createElement, type ElementType, type ReactNode } from 'react';

import { useReveal } from '@/hooks/useReveal';

type RevealProps = {
  /** Element to render — keeps the DOM shape the CSS expects. */
  as?: ElementType;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

/**
 * Wraps content in an element that fades and lifts into view on scroll.
 * Children are rendered by the server; only this wrapper ships to the client.
 */
export default function Reveal({ as: Tag = 'div', className, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();

  return createElement(
    Tag,
    { ref, className: className ? `${className} reveal` : 'reveal', ...rest },
    children,
  );
}
