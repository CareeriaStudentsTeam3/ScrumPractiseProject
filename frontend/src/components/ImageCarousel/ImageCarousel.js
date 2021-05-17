import React, { useState } from 'react'
import ItemsCarousel from 'react-items-carousel'

// Material UI importsd
import Button from '@material-ui/core/Button'

const ImageCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 40

  return (
    <div style={{ padding: `0 ${0}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={window.innerWidth > 768 ? 3 : 1}
        gutter={10}
        leftChevron={
          <Button color="primary">
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            }
          </Button>
        }
        rightChevron={
          <Button color="primary">
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
            }
          </Button>
        }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div style={{ height: '100%' }}>
          <img
            style={{ height: '95%', width: '100%', objectFit: 'contain' }}
            src="https://images.unsplash.com/photo-1470259078422-826894b933aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1653&q=80"
            alt=""
          />
        </div>
        <div style={{ height: '100%' }}>
          <img
            style={{ height: '95%', width: '100%', objectFit: 'contain' }}
            src="https://images.unsplash.com/photo-1516727003284-a96541e51e9c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            alt=""
          />
        </div>
        <div style={{ height: '100%' }}>
          <img
            style={{ height: '95%', width: '100%', objectFit: 'contain' }}
            src="https://images.unsplash.com/photo-1595516029258-7648e25b2abd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            alt=""
          />
        </div>
        <div style={{ height: '100%' }}>
          <img
            style={{ height: '95%', width: '100%', objectFit: 'contain' }}
            src="https://images.unsplash.com/photo-1470259078422-826894b933aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1653&q=80"
            alt=""
          />
        </div>
      </ItemsCarousel>
    </div>
  )
}

export default ImageCarousel
