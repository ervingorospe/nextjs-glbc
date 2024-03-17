import React from 'react'
// components
import { HeaderPopover } from '@/components/layouts'
// function
import { getNavigationDetails, getActionButtons } from '@/function/navigation'
import { getGeneralInfo } from '@/function/page'

export async function Header() {
  const navigation = await getNavigationDetails()
  const general = await getGeneralInfo()
  const actionButtons = await getActionButtons()

  return (
    <>
      <HeaderPopover 
        navigation={navigation} 
        general={general}
        actionButtons={actionButtons}
      />
    </>
  )
}
