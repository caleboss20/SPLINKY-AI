import { useState, useEffect } from 'react';
import { FaChevronDown, FaCheck } from "react-icons/fa";
function Terms() {
  const [expandedSections, setExpandedSections] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAcceptMessage, setShowAcceptMessage] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [showAcceptSection, setShowAcceptSection] = useState(false);
  // Track scroll position for scroll buttons and accept section
  useEffect(() => {
    const handleScroll = (e) => {
      const element = e.target;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
     
      // Show scroll to top after 300px
      setShowScrollTop(scrollTop > 300);
     
      // Show scroll to bottom if not at bottom
      setShowScrollBottom(scrollHeight - scrollTop > 100);
     
      // Show accept section only when near the bottom (90% of scroll)
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setShowAcceptSection(scrollProgress > 0.85);
    };
    const contentDiv = document.getElementById('terms-content');
    if (contentDiv) {
      contentDiv.addEventListener('scroll', handleScroll);
      return () => contentDiv.removeEventListener('scroll', handleScroll);
    }
  }, []);
  // Scroll to top function
  const scrollToTop = () => {
    const contentDiv = document.getElementById('terms-content');
    if (contentDiv) {
      contentDiv.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  // Scroll to bottom function
  const scrollToBottom = () => {
    const contentDiv = document.getElementById('terms-content');
    if (contentDiv) {
      contentDiv.scrollTo({ top: contentDiv.scrollHeight, behavior: 'smooth' });
    }
  };
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  const handleAccept = () => {
    setAcceptedTerms(true);
    setShowAcceptMessage(true);
    setTimeout(() => setShowAcceptMessage(false), 3000);
  };
  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
     
      .animate-slideUp {
        animation: slideUp 0.4s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const sections = [
    {
      id: 'welcome',
      title: 'Welcome to Geni AI',
      content: `These Terms of Service ("Terms") apply to your use of Geni AI, Geni Intelligence Hub, and Geni's other services for individuals, including associated applications and websites (collectively, the "Service"). These Terms form an agreement between you and Geni AI Inc., a registered company ("Geni," "we," "our," or "us"). By using our Service, you acknowledge and agree to these Terms.
Please note that we reserve the right to modify these Terms. Our Enterprise Terms of Service govern the use of our services for developers and businesses, including Geni APIs and development platforms. Please read our Privacy Policy, which describes how we collect, use and disclose personal information. While it does not form part of these Terms, it is an important document you should review.`
    },
    {
      id: 'who-we-are',
      title: 'Who We Are',
      content: `Geni AI is a company working on building advanced artificial intelligence to accelerate human discovery and innovation. We are guided by our mission to advance our collective understanding and solve humanity's most challenging problems. As part of our mission, we have developed "Geni," a conversational generative AI powered by Geni's proprietary large language models. We also provide "Geni Intelligence Hub," an online collection of curated knowledge and resources. For more information about Geni AI, please visit our official website. Geni AI is a separate and independent company.`
    },
    {
      id: 'registration',
      title: 'Registration and Access',
      subsections: [
        {
          subtitle: 'Minimum Age',
          text: `You must be at least 13 years old or the minimum age required in your country to use the Service, and you must confirm that you meet the minimum age requirement. If you are a teenager between the ages of 13 and 17 years old, you must have your parent or legal guardian's permission to use the Service, and they must agree to our Terms of Service.
While we have taken measures to limit undesirable training data and outputs, depending on the features that you choose to use, the Service could produce output that is not appropriate for all ages. We urge parents to exercise care in monitoring the use of the Service by their teenagers.`
        },
        {
          subtitle: 'Account Registration',
          text: `You must provide accurate and complete information to register for an account to use our Service. You may not share your account credentials or make your account available to anyone else, and are responsible for all activities that occur under your account. If you create an account or use the Service on behalf of another person or entity, you must have the authority to accept these Terms on their behalf.`
        },
        {
          subtitle: 'Third-Party Login',
          text: `By choosing to login to our Service by using a third-party service, such as Google, Apple, or other providers, you give us permission to access, use, and store your information from that service, as permitted by that service, which may include login credentials and access tokens.`
        }
      ]
    },
    {
      id: 'using-service',
      title: 'Using Our Service',
      subsections: [
        {
          subtitle: 'What You Can Do',
          text: `Subject to your compliance with these Terms, you may access and use our Service. You must comply with all applicable laws as well as our Acceptable Use Policy and any other documentation, guidelines, or policies we make available to you, including on our website.`
        },
        {
          subtitle: 'What You Cannot Do',
          text: `Prohibited uses of our Service include any illegal, harmful, or abusive activities:
• Detrimentally impacting the Service, including by modifying, copying, leasing, selling, or reverse engineering our Service
• Using the Service to develop models or services that compete with Geni AI, or scraping and reselling any Input or Output
• Disrupting, interfering with, or unauthorized access to the Service or its safety systems
• Critically harming or promoting harm to human life, including pro-terrorist activities
• Violating copyright, trademark, or other intellectual property law
• Violating a person's privacy or their right to publicity
• The sexualization or exploitation of children
• Espionage, hacking, defrauding, defamation, scamming, spamming, or phishing
• Violating laws or regulations, including operating in regulated industries without compliance
• Making high-stakes automated decisions that affect a person's safety, legal or material rights, or well-being`
        }
      ]
    },
    {
      id: 'user-content',
      title: 'User Content',
      subsections: [
        {
          subtitle: 'You Own Your User Content',
          text: `You may provide input (e.g., text, audio, images, video, code, files, etc.) to the Service ("Input") and receive output from the Service ("Output"). Collectively, Input and Output are "User Content." You are responsible for User Content, including ensuring that it does not violate any applicable law or these Terms.
To the extent permitted by applicable law, you retain your ownership rights to the User Content. We ask that when using Output, you attribute Geni AI as having generated the Output.`
        },
        {
          subtitle: 'Our Use of User Content',
          text: `You grant Geni AI an irrevocable, perpetual, transferable, sublicensable, royalty-free, and worldwide right to use, copy, store, modify, distribute, reproduce, and display your User Content for purposes including: maintaining and providing the Service; improving our products; data analysis; customer and market research; and developing new products or features.
Automated systems may analyze your use of the Service and User Content for business, safety, and compliance purposes. A limited number of our authorized personnel may review your content for specific business purposes, including improving product features and investigating security incidents.`
        },
        {
          subtitle: 'Content Control',
          text: `When logged into our Service, you can select whether or not you want us to use your User Content to improve our products and services and train our models. User Content that you request to be deleted will be queued for deletion, which may take up to 30 days.`
        }
      ]
    },
    {
      id: 'accuracy',
      title: 'Accuracy and Limitations',
      content: `Artificial intelligence is rapidly evolving and probabilistic in nature; therefore, it may sometimes: (a) result in Output that contains inaccuracies or "hallucinations," (b) be offensive, (c) not accurately reflect real people, places or facts, or (d) be objectionable or inappropriate for your intended purpose.
Due to the nature of artificial intelligence, outputs may not be unique, and different users may receive similar output from our Service. Output may not always be accurate and is not professional advice. You should conduct your own thorough research and not rely on Output as the sole source of truth or factual information.`
    },
    {
      id: 'service-availability',
      title: 'The Service Is Available "As Is"',
      content: `We continue to add new models and features, some of which may be in beta testing where indicated. You accept that all of our services, including but not limited to such beta technologies, are provided "AS IS" and may contain errors, defects, bugs or inaccuracies that could fail or cause corruption or loss of data and information. You agree that use of any of our technologies is at your own risk.
We may implement rate limitations to accommodate system resources or usage needs at our sole discretion.`
    },
    {
      id: 'intellectual-property',
      title: 'Geni AI\'s Intellectual Property Rights',
      subsections: [
        {
          subtitle: 'Service Ownership',
          text: `Geni AI and its affiliates own all rights, title, and interest in and to the Service, including all intellectual property rights.`
        },
        {
          subtitle: 'Usage Data',
          text: `We may collect diagnostic, technical, usage, and related information about your interaction with our Service. All such Usage Data is owned solely and exclusively by Geni AI. You assign to us all rights in such data, and we may use it for providing the Service, improving products, research, analytics, and other lawful purposes.`
        },
        {
          subtitle: 'Feedback',
          text: `Any suggestions, recommendations, or feedback you provide relating to the Service is assigned to Geni AI, and we may freely use such Feedback for any purpose without attribution or compensation to you.`
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Security',
      subsections: [
        {
          subtitle: 'Privacy',
          text: `By using the Service, you acknowledge that we may collect, use, and disclose your personal information as set forth in our Privacy Policy. Your personal information may be transferred to and processed in the United States and other jurisdictions.`
        },
        {
          subtitle: 'Security',
          text: `We care about the security of your personal information. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures. You acknowledge that you provide your data at your own risk and will notify us immediately of any breach of security or unauthorized use of your account.`
        }
      ]
    },
    {
      id: 'paid-accounts',
      title: 'Paid Accounts',
      subsections: [
        {
          subtitle: 'Fees and Payments',
          text: `If you purchase any aspect of the Service, you must provide complete and accurate billing information, including a valid payment method. We will automatically charge your payment method on each periodic renewal until you cancel. We will charge tax when required.
You can cancel your paid subscription at any time; however, payments already made are non-refundable, except where required by law.`
        },
        {
          subtitle: 'Price Changes',
          text: `We may adjust subscription prices periodically. If prices increase, we will provide 30 days' notice, and the new price will apply at your next renewal, allowing you to cancel if you disagree with the change.`
        }
      ]
    },
    {
      id: 'termination',
      title: 'Termination and Suspension',
      subsections: [
        {
          subtitle: 'We May Terminate or Suspend Your Access',
          text: `You are free to stop using our Service at any time and close your account. Geni AI may terminate or suspend your access to our Service or delete your account at any time without notice if we determine, at our sole discretion, that:
• You breached these Terms or our Acceptable Use Policy
• We must do so to comply with the law
• Your use of our Service could cause risk or harm to Geni AI, our users, or anyone else
• Your account has been inactive for over a year and you do not have a paid account`
        },
        {
          subtitle: 'No Refunds',
          text: `Upon Service termination, you will not be entitled to any refund, except where required by law.`
        },
        {
          subtitle: 'Appeals',
          text: `If you believe we have suspended or terminated your account in error, you can file an appeal by contacting our support team.`
        }
      ]
    },
    {
      id: 'warranties',
      title: 'Disclaimer of Warranties',
      content: `TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK.
THE SERVICE, THE INTELLECTUAL PROPERTY, AND ANY OTHER INFORMATION AVAILABLE ON OR THROUGH THE SERVICE ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND/OR NON-INFRINGEMENT.
GENI AI DOES NOT GUARANTEE THAT THE FUNCTIONS OR FEATURES OF THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE OR THAT DEFECTS WILL BE CORRECTED.`
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      content: `To the fullest extent permitted by law, you will defend, indemnify, and hold Geni AI and our parents, subsidiaries and affiliates, and our and their respective agents, suppliers, licensors, employees, contractors, officers, and directors harmless from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including legal fees) arising from or related to your use of the Service, your Input, or any violation of these Terms.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: `TO THE FULLEST EXTENT PERMITTED BY LAW, GENI AI WILL NOT BE LIABLE FOR:
(A) ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, OR DATA, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE
(B) ANY CLAIMS, DAMAGES OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO US OR $100.00 USD, WHICHEVER IS GREATER.
These limitations apply even if we have been advised of the possibility of such damages. Some jurisdictions do not allow the disclaimer of certain warranties or limitation of certain damages, so some of these terms may not apply to you.`
    },
    {
      id: 'copyright',
      title: 'Copyright and Intellectual Property Claims',
      content: `If you believe that your copyrighted work or other intellectual property has been infringed and is accessible via the Service, you agree to first notify our legal team with a detailed DMCA notice.
We may, if feasible, delete or disable content that we believe violates these Terms or is alleged to be infringing and will terminate accounts of repeat infringers at our sole discretion.
Your DMCA notice must include: (1) an electronic or physical signature of the copyright owner or authorized representative; (2) a description of the copyrighted work; (3) the location of the allegedly infringing material; (4) your contact information; (5) a statement of good-faith belief that the use is unauthorized; and (6) a statement under penalty of perjury that the information is accurate.`
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Dispute Resolution',
      content: `These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles. Any legal action or proceeding related to these Terms shall be subject to the exclusive jurisdiction of the federal and state courts located in the United States.
You agree to attempt to resolve any dispute informally by contacting our support team before pursuing any formal legal action.`
    },
    {
      id: 'modifications',
      title: 'Modifications to These Terms',
      content: `We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a prominent notice on our Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms. It is your responsibility to review these Terms periodically for changes.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: `If you have any questions about these Terms or the Service, please contact us at:
        Geni AI Inc.
        Email: legal@geni.ai
        Support: support@geni.ai
        We are committed to addressing your concerns and working with you to resolve any issues.`
    }
  ];
  const TableOfContents = () => (
    <div className="mb-8 p-6 bg-white border border-slate-300 rounded-lg">
      <h2 className="text-xl font-bold text-black mb-4">Table of Contents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-black hover:text-slate-700 hover:underline transition-colors text-sm"
          >
            {section.title}
          </a>
        ))}
      </div>
    </div>
  );
 
      const Section = ({ section }) => {
    const isExpanded = expandedSections[section.id] !== false;
    return (
      <div id={section.id} className="mb-8 border-b border-slate-200 pb-8 last:border-b-0">
        {/* <button
          onClick={() => toggleSection(section.id)}
          className="w-full flex items-center justify-between 
          group hover:bg-slate-50 p-3 rounded-lg transition-colors mb-4"
        > */}
        {/* </button> */}
          <h2 className="text-2xl mb-6 font-bold leading-normal text-slate-900 text-left">{section.title}</h2>
         
        
        {isExpanded && (
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {section.content && <p className="whitespace-pre-wrap">{section.content}</p>}
            {section.subsections && (
              <div className="space-y-6">
                {section.subsections.map((subsection, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {subsection.subtitle}
                    </h3>
                    <p className="whitespace-pre-wrap text-slate-700">{subsection.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header - White Background with Column Layout */}
      <div className="bg-white text-black border-b border-slate-200">
        <div className="px-6 py-12 sm:px-8">
          <div className="mb-8">
            <button className="text-black hover:text-slate-600 transition-colors mb-8">
              <FaChevronDown size={32} className="rotate-90" />
            </button>
          </div>
         
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-black">
              Terms of Service -<br />Consumer
            </h1>
           
            <div className="space-y-2">
              <p className="text-slate-600 italic">Effective: January 2025</p>
              <p className="text-slate-500 italic">(previous version)</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full px-4 py-12 sm:px-8 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <TableOfContents />
          {/* Sections */}
          <div id="terms-content" className="max-h-96 pr-4 space-y-2">
            {sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
      {/* Scroll to Top and Bottom Buttons - Stacked Vertically */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all duration-200 hover:scale-110"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <FaChevronDown size={24} className="rotate-180" />
          </button>
        )}
        {/* Scroll to Bottom Button */}
        {showScrollBottom && (
          <button
            onClick={scrollToBottom}
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all duration-200 hover:scale-110"
            aria-label="Scroll to bottom"
            title="Scroll to bottom"
          >
            <FaChevronDown size={24} />
          </button>
        )}
      </div>
      {/* Footer Actions - Only appears when scrolled near bottom */}
      {showAcceptSection && (
        <div className="w-full px-4 py-12 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 bg-black rounded-lg shadow-lg animate-slideUp">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  {/* < FaAlertCircl size={20} className="text-white flex-shrink-0 mt-0.5" /> */}
                  <p className="text-white text-sm">
                    By clicking "Accept Terms," you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                </div>
                <button
                  onClick={handleAccept}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    acceptedTerms
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-black hover:bg-slate-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  {acceptedTerms ? (
                    <>
                      <FaCheck size={20} />
                      <span>Terms Accepted</span>
                    </>
                  ) : (
                    <span>Accept Terms and Conditions</span>
                  )}
                </button>
                {showAcceptMessage && (
                  <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
                    ✓ Thank you for accepting our Terms and Conditions. You can now proceed to use Geni AI.
                  </div>
                )}
              </div>
            </div>
            {/* Additional Info */}
            <div className="pt-8 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                © 2025 Geni AI Inc. All rights reserved. | Last updated: February 10, 2025
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Terms;