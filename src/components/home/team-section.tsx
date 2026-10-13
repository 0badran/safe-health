import React from 'react'
import TeamCard from '../shared/team-card'
import SectionHeader from '../shared/section-header'

const TeamSection = () => {
    const dummydata: { name: string, imgSrc: string, expYears: number, special: string }[] = [
        {
            name: "Dr. Ananya Mehta",
            special: "Dermatology",
            imgSrc: "/images/hero-doctor.jpg",
            expYears: 15,
        },
        {
            name: "Dr. Ananya Mehta",
            special: "Dermatology",
            imgSrc: "/images/hero-doctor.jpg",
            expYears: 15,
        },
        {
            name: "Dr. Ananya Mehta",
            special: "Dermatology",
            imgSrc: "/images/hero-doctor.jpg",
            expYears: 15,
        },
        {
            name: "Dr. Ananya Mehta",
            special: "Dermatology",
            imgSrc: "/images/hero-doctor.jpg",
            expYears: 15,
        }
    ]
    return (
        <section className='flex flex-col '>

            <SectionHeader
                subTitle={"  Trusted Hands, Expert Care"}
                title={"Meet Our Doctors &amp; Specialists"}
                desc='Our team of certified and experienced doctors is dedicated to providing
          exceptional medical care across every specialty.'
                buttonText="view doctors team"
                buttonLink='/doctors'

            />
            <div className='flex gap-4 items-center'>
                {dummydata?.map((doc, ind) =>
                    <TeamCard
                        key={ind}
                        name={doc.name}
                        expYears={doc.expYears}
                        special={doc.special}
                        imgSrc={doc.imgSrc}
                    />
                )}
            </div>
        </section>

    )
}

export default TeamSection