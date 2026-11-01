import Link from "next/link";

const PrivacyPolicy = () => {
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
            Your Privacy Matters
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: November 1, 2026
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
            At CivicSocialPlus, we believe that building a better community
            starts with trust. This Privacy Policy explains what information
            we collect, how we use it, and how we work to protect your
            personal information when you use our platform.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-8 sm:text-base">
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              1. Information We Collect
            </h2>

            <p>
              When you create an account or use CivicSocialPlus, we may
              collect the following information:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Account Information:</strong> Your name, email
                address, password credentials, and profile photo.
              </li>
              <li>
                <strong>Authentication Information:</strong> Information
                needed to authenticate your account through email/password
                or supported third-party sign-in providers.
              </li>
              <li>
                <strong>Event Information:</strong> Event titles,
                descriptions, categories, locations, dates, and images
                submitted when you create or manage an event.
              </li>
              <li>
                <strong>Participation Information:</strong> Information
                about events you choose to join and your related
                participation records.
              </li>
              <li>
                <strong>Technical Information:</strong> Basic information
                such as browser or device details may be processed when
                necessary to operate and secure the platform.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              2. How We Use Your Information
            </h2>

            <p>
              We use collected information to provide and improve the
              CivicSocialPlus experience. This includes:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Creating and managing your account.</li>
              <li>Authenticating users and protecting secure routes.</li>
              <li>Displaying community events and event details.</li>
              <li>Allowing users to create, update, and manage their events.</li>
              <li>Managing event participation and joined event records.</li>
              <li>Maintaining platform functionality and preventing misuse.</li>
              <li>Responding to support requests and technical issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              3. Account and Profile Visibility
            </h2>

            <p>
              CivicSocialPlus is a community platform. Some information
              associated with your account may be visible to other users
              when you create or participate in community activities.
              For example, your display name and profile photo may appear
              alongside events you organize.
            </p>

            <p className="mt-3">
              Event information you submit, such as its title, description,
              date, and location, may be publicly visible. Please avoid
              including sensitive personal information in public event
              descriptions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              4. Authentication and Account Security
            </h2>

            <p>
              We use Better Auth to support account registration,
              authentication, and session management. Depending on the
              sign-in method you choose, authentication may be handled
              through email/password or a supported provider such as
              Google.
            </p>

            <p className="mt-3">
              Our backend uses authentication tokens to verify protected
              requests and help ensure that users can only access
              authorized features. Passwords and authentication credentials
              should never be shared with other people.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              5. Data Storage and Security
            </h2>

            <p>
              Account and event information is stored using our
              application database infrastructure, including MongoDB.
              We take reasonable technical measures to protect stored
              information against unauthorized access, alteration,
              disclosure, or loss.
            </p>

            <p className="mt-3">
              However, no online service or electronic storage system
              can guarantee absolute security. We encourage users to
              choose strong passwords and keep their account credentials
              private.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              6. Cookies and Sessions
            </h2>

            <p>
              CivicSocialPlus may use cookies or similar browser storage
              technologies to maintain authentication sessions, remember
              necessary preferences, and support essential platform
              functionality.
            </p>

            <p className="mt-3">
              Disabling essential cookies may affect your ability to sign
              in or use certain protected features.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              7. Third-Party Services
            </h2>

            <p>
              Our platform may rely on third-party services for
              authentication, hosting, database infrastructure, or
              displaying externally hosted images.
            </p>

            <p className="mt-3">
              If you choose to sign in through a third-party provider,
              that provider may process information according to its
              own privacy policy. We encourage you to review the privacy
              practices of any external service you use.
            </p>

            <p className="mt-3">
              CivicSocialPlus does not control the privacy practices,
              availability, or security of external websites and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              8. Sharing of Information
            </h2>

            <p>
              We do not sell your personal information. Information may
              be processed by service providers when necessary to operate
              the platform, provide authentication, maintain security,
              or comply with applicable legal obligations.
            </p>

            <p className="mt-3">
              Public event information and profile details may also be
              visible to other platform users as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              9. Data Retention and Account Changes
            </h2>

            <p>
              We retain account and event information for as long as
              necessary to provide the platform and fulfill legitimate
              operational or legal requirements.
            </p>

            <p className="mt-3">
              If you need to correct your profile information or request
              account or data deletion, please contact us. Some information
              may need to be retained where required by law or necessary
              for legitimate security and operational purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              {`10. Children's Privacy`}
            </h2>

            <p>
              CivicSocialPlus is not designed to knowingly collect
              personal information from children in violation of
              applicable privacy laws. If you believe a child has
              provided personal information without appropriate
              authorization, please contact us so the matter can be
              reviewed.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              11. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time to
              reflect changes in our platform, features, or privacy
              practices. Any updated version will be published on this
              page with a revised Last Updated date.
            </p>

            <p className="mt-3">
              We encourage users to review this page periodically to
              stay informed about how their information is handled.
            </p>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-6 dark:bg-emerald-400/5 sm:p-8">
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              12. Contact Us
            </h2>

            <p>
              If you have questions, concerns, or requests regarding
              this Privacy Policy or the handling of your personal
              information, please contact the CivicSocialPlus team.
            </p>

            <p className="mt-4 font-semibold text-emerald-700 dark:text-emerald-400">
              Email: support@civicsocialplus.com
            </p>
          </section>
        </div>

    
      </article>
    </main>
  );
};

export default PrivacyPolicy;
