
import {
    CCol,
    CRow,
    CWidgetSimple,
    CContainer,
    
    
  } from '@coreui/react'

  import CIcon from '@coreui/icons-react'
  
  
  
  
  
  const Data = () => {
    return (
      <>
  
  
            <CRow className="pt-10">
                <CCol xs="12" sm="6" lg="3">
                    <CRow className="pb-4">
                        <CContainer fluid className="align-self-center">
                            <strong style={{fontSize: 'medium'}}>Settings</strong>
                            <CIcon className="float-right" size={'lg'} name={'cilSettings'} />
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text="1,123">
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text="1,123">
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text="1,123">
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>

                    <CRow>
                        <CContainer fluid>
                            <CWidgetSimple header="title" text="1,123">
                            </CWidgetSimple>
                        </CContainer>
                    </CRow>
                </CCol>
                <CCol xs="12" sm="6" lg="9">
                    <CWidgetSimple header="title" text="1,123">
                    </CWidgetSimple>
                </CCol>
            </CRow>
        </>
    )
  }
  
  export default Data;
  