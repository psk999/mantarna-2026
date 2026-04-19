export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/mhpl logo.png"
              alt="Mantrana Healthtech logo"
              className="h-12 w-12 rounded-md object-cover"
            />
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight text-slate-900">
                Mantrana Healthcare Technology Pvt. Ltd.
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Human Wisdom, Machine Intelligence
              </p>
            </div>
          </a>

          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-teal-700">
              About
            </a>
            <a href="#internships" className="transition hover:text-teal-700">
              Internships
            </a>
            <a href="#contact" className="transition hover:text-teal-700">
              Contact
            </a>
          </nav>

                </div>
      </header>

      <section className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10">
        <div className="text-center">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
            A collaborative healthcare transformation initiative connecting
            institutions, research, innovation, and digital technology for
            meaningful healthcare impact.
          </p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm">
            <img
              src="/mhpl collaboration.png"
              alt="Mantrana collaboration with partner institutions"
              className="w-full object-cover"
            />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://sssihl.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              SSSIHL
            </a>

            <a
              href="https://whitefield.sssihms.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              SSSIHMS
            </a>

            <a
              href="https://sssrif.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              SSSRIF
            </a>

            <a
              href="https://iic.sssihl.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              IIC
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/75 p-8 shadow-sm backdrop-blur-sm">
          <div className="grid gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-teal-700">Vision</p>
              <p className="mt-2 text-slate-600">
                Blending human wisdom with technology to support practical,
                collaborative healthcare transformation.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-teal-700">Collaboration</p>
              <p className="mt-2 text-slate-600">
                Built through academic, clinical, research, and innovation
                partnerships that strengthen real-world impact.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-teal-700">Opportunity</p>
              <p className="mt-2 text-slate-600">
                Students can engage through internships and contribute to
                meaningful healthcare technology initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-slate-200 bg-white/70 px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            About Mantrana
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Mantrana brings together human expertise and machine intelligence to
            support collaborative work in healthcare technology, implementation
            Research (IR) and innovation.
          </p>
        </div>
      </section>

      <section
        id="internships"
        className="border-t border-slate-200 bg-white px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Internship Areas
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Students can apply through the Google Form to participate in
            technology, data, research, and healthcare-oriented internship work.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Web Development
              </h3>
              <p className="mt-3 text-slate-600">
                Build and improve responsive website and interface components.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                AI / Data Science
              </h3>
              <p className="mt-3 text-slate-600">
                Contribute to analytics, machine learning, and data-supported
                project activities.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Healthcare Technology
              </h3>
              <p className="mt-3 text-slate-600">
                Support healthcare-focused innovation and collaborative digital
                initiatives.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://forms.gle/EG3dn4emFdzqTNJM8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <section
  id="contact"
  className="border-t border-slate-200 bg-white/70 px-6 py-20 md:px-10"
>
  <div className="mx-auto max-w-5xl text-center">
    <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
      Contact
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
      For collaboration, internship coordination, and institutional
      engagement, please connect through the official Mantrana channels.
    </p>

    <div className="mt-10 flex flex-col items-center gap-4 text-slate-700">
      <a
        href="mailto:contact@mantranahealthcare.com"
        className="text-lg font-medium transition hover:text-teal-700"
      >
        contact@mantranahealthcare.com
      </a>

      <a
        href="https://mantarna-2026.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-medium transition hover:text-teal-700"
      >
        Visit Website
      </a>
    </div>
  </div>
</section>

      <footer className="border-t border-slate-200 bg-white/80 px-6 py-8 md:px-10">
  <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
    <p>© 2026 Mantrana Healthcare Technology Pvt. Ltd.</p>
    <p>Human Wisdom, Machine Intelligence</p>
  </div>
</footer>

    </main>
  );
}