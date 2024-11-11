import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'


import PersonalDetailPreview from '@/dashboard/components/preview/PersonalDetailsPreview'
import SummeryPreview from '@/dashboard/components/preview/SummaryPreview'
import ExperiencePreview from '@/dashboard/components/preview/ExperiancePreview'
import EducationalPreview from '@/dashboard/components/preview/EducationalPreview'
import SkillsPreview from '@/dashboard/components/preview/SkillPreview'

function ResumePreview() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor:resumeInfo?.themeColor
    }}>
        {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery  */}
            <SummeryPreview resumeInfo={resumeInfo} />
        {/* Professional Experience  */}
           {resumeInfo?.Experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo} />}
        {/* Educational  */}
        {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo} />}
        {/* Skilss  */}
        {resumeInfo?.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo}/>}
    </div>
  )
}

export default ResumePreview