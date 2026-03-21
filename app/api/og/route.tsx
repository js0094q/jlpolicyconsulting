import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_KICKER_MAX_LENGTH,
  OG_SUBTITLE_MAX_LENGTH,
  OG_TITLE_MAX_LENGTH,
} from "@/lib/og";

export const runtime = "edge";

const background = "#f6f5f1";
const surface = "#fcfcfa";
const border = "#d6dde5";
const ink = "#1f252d";
const muted = "#3f4a57";
const accent = "#1f3657";
const accentSoft = "#5f7897";

const OG_CACHE_CONTROL = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

function getParam(value: string | null, fallback: string): string {
  if (!value) {
    return fallback;
  }

  const compacted = value.replace(/\s+/g, " ").trim();
  return compacted || fallback;
}

function parseParam(
  searchParams: URLSearchParams,
  key: string,
  fallback: string,
  maxLength: number,
): string | Response {
  const parsed = getParam(searchParams.get(key), fallback);

  if (parsed.length > maxLength) {
    return new Response(`${key} exceeds maximum length of ${maxLength} characters`, {
      status: 400,
    });
  }

  return parsed;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = parseParam(
    searchParams,
    "title",
    "Reimbursement Strategy, Drug Pricing Policy, and Market Access Insight",
    OG_TITLE_MAX_LENGTH,
  );

  if (title instanceof Response) {
    return title;
  }

  const subtitle = parseParam(
    searchParams,
    "subtitle",
    "Analysis and advisory at the intersection of pharmaceutical policy, pricing, access, and payer economics.",
    OG_SUBTITLE_MAX_LENGTH,
  );

  if (subtitle instanceof Response) {
    return subtitle;
  }

  const kicker = parseParam(searchParams, "kicker", "JL Policy Consulting, LLC", OG_KICKER_MAX_LENGTH);

  if (kicker instanceof Response) {
    return kicker;
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background,
          color: ink,
          fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
          padding: "56px",
          border: `1px solid ${border}`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "18px",
            background: accent,
          }}
        />

        <div
          style={{
            marginLeft: "22px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: surface,
            border: `1px solid ${border}`,
            padding: "34px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              borderBottom: `1px solid ${border}`,
              paddingBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: accentSoft,
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                fontSize: 18,
                color: muted,
              }}
            >
              {siteConfig.domain}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "28px",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: 58,
                lineHeight: 1.12,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                maxWidth: "1020px",
                fontFamily: "'Source Serif 4', 'Times New Roman', serif",
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: muted,
                maxWidth: "980px",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "20px",
              borderTop: `1px solid ${border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: muted,
              fontSize: 20,
            }}
          >
            <div style={{ color: accent }}>Pharmaceutical Reimbursement and Payer Dynamics</div>
            <div>U.S. Policy and Market Access Analysis</div>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      headers: {
        "Cache-Control": OG_CACHE_CONTROL,
      },
    },
  );
}
