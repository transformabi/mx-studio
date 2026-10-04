import { CARD_MARKS, PIX_COLOR, PIX_PATH, WISE_COLOR, WISE_PATH } from './payment-marks';

function BrandSymbol({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="h-[18px] w-[18px] shrink-0" fill={color}>
      <path d={path} />
    </svg>
  );
}

/** Pix symbol in its official color. */
export const PixLogo = () => <BrandSymbol path={PIX_PATH} color={PIX_COLOR} />;

/** Wise flag symbol in its official color. */
export const WiseLogo = () => <BrandSymbol path={WISE_PATH} color={WISE_COLOR} />;

/** Visa, Mastercard and Elo card marks side by side; the group is announced once by name. */
export function CardLogos() {
  return (
    <span role="img" aria-label="Visa, Mastercard, Elo" className="inline-flex shrink-0 items-center gap-1">
      {(['visa', 'mastercard', 'elo'] as const).map((brand) => (
        // Static, trusted markup from payment-marks.ts.
        <span key={brand} className="inline-flex" dangerouslySetInnerHTML={{ __html: CARD_MARKS[brand] }} />
      ))}
    </span>
  );
}
