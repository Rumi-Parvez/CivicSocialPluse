import Link from "next/link";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-white px-5 py-16 text-slate-700 dark:bg-[#07130f] dark:text-slate-300 sm:px-8">
      <article className="mx-auto w-full max-w-4xl">
        <div className="mb-10 border-b border-slate-200 pb-8 dark:border-white/10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400"
          >
            ← Back to Home
          </Link>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
            Platform Guidelines
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: November 1, 2026
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
            Welcome to CivicSocialPlus! These Terms of Service explain the
            rules and responsibilities that apply when you access or use
            our community platform. By creating an account or using our
            services, you agree to follow these terms.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-8 sm:text-base">
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              1. About CivicSocialPlus
            </h2>

            <p>
              CivicSocialPlus is a community-focused platform designed to
              connect people through social development events, educational
              activities, volunteering opportunities, and community
              initiatives.
            </p>

            <p className="mt-3">
              Our goal is to help users discover events, organize activities,
              and participate in initiatives that contribute positively to
              their communities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              2. Eligibility and Account Registration
            </h2>

            <p>
              To access certain features, you must create an account using
              the registration methods available on the platform.
              You agree to provide accurate and up-to-date information
              during registration and when updating your profile.
            </p>

            <p className="mt-3">
              You are responsible for maintaining the confidentiality of
              your account credentials and for activities performed through
              your account.
            </p>

            <p className="mt-3">
              You must notify the platform team if you become aware of
              unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              3. User Responsibilities
            </h2>

            <p>
              By using CivicSocialPlus, you agree to:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Provide truthful and accurate account information.</li>
              <li>Use the platform respectfully and responsibly.</li>
              <li>Respect other users and community members.</li>
              <li>Keep your login credentials secure.</li>
              <li>Submit appropriate and accurate event information.</li>
              <li>Follow applicable laws and regulations.</li>
              <li>Avoid activities that could harm the platform or its users.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              4. Event Creation and Management
            </h2>

            <p>
              Registered users may create and manage community events
              using the available platform features.
            </p>

            <p className="mt-3">
              When creating an event, you are responsible for ensuring
              that its title, description, category, location, date,
              and other submitted details are accurate and appropriate.
            </p>

            <p className="mt-3">
              You must not publish misleading, fraudulent, harmful,
              or unauthorized events. You should only use images and
              materials that you have permission to share.
            </p>

            <p className="mt-3">
              Event organizers are responsible for the planning,
              communication, and activities associated with their
              events. CivicSocialPlus does not independently organize
              or supervise every event listed on the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              5. Joining Events
            </h2>

            <p>
              Users may join available events through the platform
              when the participation feature is enabled.
            </p>

            <p className="mt-3">
              By joining an event, you acknowledge that your participation
              information may be recorded and associated with your account.
              You are responsible for reviewing the event details and
              communicating with the organizer when necessary.
            </p>

            <p className="mt-3">
              Joining an event through CivicSocialPlus does not guarantee
              that the event will take place as originally announced.
              Organizers may change event details or cancel activities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              6. Prohibited Activities
            </h2>

            <p>
              To maintain a safe and respectful community, users must
              not use CivicSocialPlus to:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Publish false, misleading, or fraudulent information.</li>
              <li>Harass, threaten, or discriminate against others.</li>
              <li>Share illegal, harmful, or abusive content.</li>
              <li>Impersonate another person or organization.</li>
              <li>Upload content that violates another {`person's`} rights.</li>
              <li>Attempt unauthorized access to accounts or platform systems.</li>
              <li>Disrupt platform functionality or misuse its services.</li>
              <li>Use the platform for unlawful purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              7. User-Generated Content
            </h2>

            <p>
              Users retain ownership of the content they create and submit
              to CivicSocialPlus, subject to any rights held by third
              parties.
            </p>

            <p className="mt-3">
              By submitting content, you grant CivicSocialPlus permission
              to store, display, and use that content as reasonably
              necessary to operate and provide the {`platform's`} features.
            </p>

            <p className="mt-3">
              You are responsible for ensuring that your submitted content
              does not violate copyright, privacy, or other applicable
              rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              8. Third-Party Services
            </h2>

            <p>
              CivicSocialPlus may rely on third-party services for
              authentication, hosting, database management, and other
              technical functionality.
            </p>

            <p className="mt-3">
              These services operate under their own terms and policies.
              We are not responsible for the independent actions,
              availability, or policies of external service providers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              9. Event and Platform Availability
            </h2>

            <p>
              We aim to keep CivicSocialPlus available and functioning
              properly. However, we cannot guarantee uninterrupted
              access or that every feature will always be available.
            </p>

            <p className="mt-3">
              Events are created and managed by users. We do not guarantee
              the accuracy, quality, safety, or successful completion of
              every event listed on the platform.
            </p>

            <p className="mt-3">
              Users should independently verify important event details
              before attending or making participation decisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              10. Account Restrictions and Termination
            </h2>

            <p>
              We may restrict, suspend, or terminate access to accounts
              that violate these Terms of Service, misuse platform
              features, or create risks for other users or the platform.
            </p>

            <p className="mt-3">
              Where appropriate, we may review reported activity and
              take reasonable action to maintain a respectful community.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              11. Limitation of Liability
            </h2>

            <p>
              To the extent permitted by applicable law, CivicSocialPlus
              is not responsible for losses arising from user-generated
              content, event organizer decisions, event cancellations,
              third-party services, or temporary platform interruptions.
            </p>

            <p className="mt-3">
              Users participate in community activities based on their
              own judgment and should take reasonable steps to ensure
              their safety.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              12. Changes to These Terms
            </h2>

            <p>
              We may update these Terms of Service when platform features,
              operational requirements, or applicable rules change.
              Updated terms will be published on this page with a revised
              Last Updated date.
            </p>

            <p className="mt-3">
              Continued use of CivicSocialPlus after updated terms become
              effective constitutes acceptance of those changes, to the
              extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              13. Contact Us
            </h2>

            <p>
              If you have questions about these Terms of Service or
              need assistance with your account or platform activities,
              please contact the CivicSocialPlus team.
            </p>

            <p className="mt-4 font-semibold text-emerald-700 dark:text-emerald-400">
              Email: support@civicsocialplus.com
            </p>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-6 dark:bg-emerald-400/5 sm:p-8">
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Our Community Commitment
            </h2>

            <p>
              CivicSocialPlus exists to bring people together through
              meaningful community initiatives. By following these
              guidelines, you help us create a respectful, welcoming,
              and collaborative environment for everyone.
            </p>

            <p className="mt-4 font-bold text-emerald-700 dark:text-emerald-400">
              Connect. Collaborate. Create Impact.
            </p>
          </section>
        </div>

        
      </article>
    </main>
  );
};

export default TermsOfService;
