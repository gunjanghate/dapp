import React from 'react';
import { Leaf, Heart, Globe2, Users } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      description: 'Environmental scientist with 10+ years experience in conservation',
      icon: <Leaf className="h-8 w-8 text-[#B4F481] mb-4" />
    },
    {
      name: 'David Kumar',
      role: 'Head of Technology',
      description: 'Blockchain expert specializing in environmental impact tracking',
      icon: <Globe2 className="h-8 w-8 text-[#B4F481] mb-4" />
    },
    {
      name: 'Maria Rodriguez',
      role: 'Community Lead',
      description: 'NGO partnerships and community engagement specialist',
      icon: <Users className="h-8 w-8 text-[#B4F481] mb-4" />
    },
    {
      name: 'Alex Thompson',
      role: 'Impact Analyst',
      description: 'Environmental impact assessment and verification expert',
      icon: <Heart className="h-8 w-8 text-[#B4F481] mb-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-[#B4F481] mb-8">ABOUT US</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Regen Bazaar is revolutionizing environmental and social impact through blockchain technology. 
            We empower organizations to tokenize their real-world impact, creating a transparent and 
            efficient marketplace for environmental change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-[#B4F481] mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To accelerate environmental and social impact by connecting impact creators with 
              supporters through innovative blockchain solutions. We believe in transparency, 
              efficiency, and measurable impact in the fight against climate change.
            </p>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-[#B4F481] mb-4">Our Vision</h2>
            <p className="text-gray-300">
              A world where every environmental and social impact initiative can be easily funded, 
              tracked, and verified. We're building the infrastructure for the next generation of 
              environmental conservation and social impact projects.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 text-center">
                {member.icon}
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-[#B4F481] mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Whether you're an organization making an impact or an individual looking to support 
            environmental initiatives, there's a place for you in our ecosystem.
          </p>
          <button className="bg-[#B4F481] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#9FE070] transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;