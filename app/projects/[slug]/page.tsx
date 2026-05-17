import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      <Navbar />

      <section
        className="project-section"
        style={{
          padding: "60px 40px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(32px, 5vw, 64px)",
            color: "#ffffff",
            textTransform: "none",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          {project.title}
        </h1>

        {/* Paragraph */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#ffffff",
            textTransform: "none",
            letterSpacing: 0,
            maxWidth: "600px",
            marginBottom: "40px",
            opacity: 0.8,
          }}
        >
          {project.description}
        </p>

        {/* Video */}
        {!project.hideVideo && <div
          style={{
            width: "min(100%, 1000px)",
            margin: "0 auto 40px",
            aspectRatio: "16/9",
            background: "#111",
            borderRadius: "12px",
            border: "1px solid rgba(224, 90, 118, 0.3)",
            overflow: "hidden",
          }}
        >
          {project.video ? (
            <iframe
              src={project.video}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                color: "rgba(224, 90, 118, 0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Video coming soon
              </span>
              <span style={{ fontSize: "32px" }}>:(</span>
            </div>
          )}
        </div>}

        {/* Local Videos Grid */}
        {project.localVideos && project.localVideos.length > 0 && (
          <div
            className="local-vid-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
              width: "min(100%, 1000px)",
              margin: "0 auto 40px",
            }}
          >
            {project.localVideos.map((src, i) => (
              <video
                key={i}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            ))}
          </div>
        )}

        {/* Boxes */}
        {project.boxes && project.boxes.length > 0 && (
          <div
            className="project-boxes"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "32px",
              marginBottom: "40px",
              maxWidth: "900px",
            }}
          >
            {project.boxes.map((box) => (
              <div
                key={box.title}
                style={{
                  background: "#202a75",
                  border: "1px solid #202a75",
                  borderRadius: "12px",
                  padding: "28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fca163",
                    textTransform: "none",
                    letterSpacing: "-0.01em",
                    marginBottom: "16px",
                  }}
                >
                  {box.title}
                </h3>
                {box.intro && (
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#ffffff",
                      textTransform: "none",
                      letterSpacing: 0,
                      marginBottom: "12px",
                    }}
                  >
                    {box.intro}
                  </p>
                )}
                {box.highlights && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {box.highlights.map((h) => (
                      <li key={h.term} style={{ fontSize: "14px", lineHeight: 1.6, color: "#ffffff", textTransform: "none", letterSpacing: 0 }}>
                        <span style={{ color: "#fca163", fontWeight: 900, textShadow: "0 0 1px #fca163, 1px 0 0 #fca163" }}>{h.term}</span>{" "}
                        {h.description}
                      </li>
                    ))}
                  </ul>
                )}
                {box.body && (
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#ffffff",
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    {box.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Groups */}
        {project.imageGroups && project.imageGroups.length > 0 && (
          <div className="project-imggroup" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px", width: "min(100%, 1000px)", margin: "0 auto 40px" }}>
            {project.imageGroups.map((group, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${group.columns ?? 1}, 1fr)`,
                  gap: group.gap ?? "16px",
                  ...(group.maxWidth ? { maxWidth: group.maxWidth, margin: `${group.marginTop ?? "0"} auto 0` } : {}),
                }}
              >
                {group.images.map((src, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={j}
                    src={src}
                    alt={`${project.title} ${i + 1}-${j + 1}`}
                    style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
              marginBottom: "40px",
              maxWidth: "850px",
              margin: "0 auto 40px",
            }}
          >
            {project.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${project.title} ${i + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            ))}
          </div>
        )}

      </section>

      {/* Related Projects */}
      <section className="related-section" style={{ padding: "60px 40px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#ffffff",
            opacity: 0.7,
            marginBottom: "30px",
          }}
        >
          Related Projects
        </h2>

        <div
          className="related-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/10",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(224, 90, 118, 0.2)",
                  cursor: "pointer",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 16px 16px",
                    background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 100%)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#fff",
                      textTransform: "none",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
