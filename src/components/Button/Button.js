import React from 'react'
import cx from 'classnames'
import './Button.css'

// this is a helper function that takes care of the className and properties for buttons on the register and login form

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button className={cx('Button', className)} ref={ref} {...props} />
  )
})

export default Button
