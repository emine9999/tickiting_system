// app/docs/api/page.tsx
"use client";

import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
