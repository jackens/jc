/**
 * Styles for simple self-hosted Trello alternative.
 */

import { style } from '../js/style.js'

export const CLASS_TODO_LIST = 'todo-list'
export const CLASS_TODO_TASK = 'todo-task'
export const CLASS_TODO_TASKS = 'todo-tasks'

export const LIST_WIDTH = 300
export const PADDING = 5

const BODY_COLOR = '#39d'
const borderRadius = '5px'
const ADD_NEW_TASK_BUTTON_HEIGHT = 20
const ADD_NEW_TASK_BUTTON_FONT_HEIGHT = '14px'
const ADD_NEW_LIST_BUTTON_HEIGHT = 45
const ADD_NEW_LIST_BUTTON_FONT_HEIGHT = '16px'
const COLOR = '#0006'
const color = '#000b'
const LIST_COLOR = '#eee'
const SCROLLBAR_THUMB_COLOR = '#bbb'
const SCROLLBAR_THUMB_HOVER_COLOR = '#999'
const SCROLLBAR_TRACK_COLOR = '#ddd'
const TITLE_HEIGHT = ADD_NEW_LIST_BUTTON_HEIGHT

export const todoPageStyle = style({
  '*': {
    boxSizing: 'border-box',
    color,
    fontFamily: 'Arial, Helvetica, sans-serif',
    scrollbarColor: `${SCROLLBAR_THUMB_COLOR} ${BODY_COLOR}`,
    scrollbarWidth: 'thin',
    '::-webkit-scrollbar': {
      height: `${2 * PADDING}px`,
      width: `${2 * PADDING}px`
    },
    '::-webkit-scrollbar-track': {
      background: BODY_COLOR,
      borderRadius
    },
    '::-webkit-scrollbar-thumb': {
      background: SCROLLBAR_THUMB_COLOR,
      border: `solid ${BODY_COLOR} 2px`,
      borderRadius
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: SCROLLBAR_THUMB_HOVER_COLOR
    }
  },
  ':focus': {
    border: 0,
    outline: 0
  },
  input: {
    border: 0,
    borderRadius: `${borderRadius} ${borderRadius} 0 0`,
    width: '100%'
  },
  body: {
    backgroundColor: BODY_COLOR,
    margin: 0,
    '>div': {
      overflow: 'auto',
      padding: `${PADDING}px`,
      [`>div.${CLASS_TODO_LIST}`]: {
        backgroundColor: LIST_COLOR,
        borderRadius,
        display: 'block',
        float: 'left',
        margin: `${PADDING}px`,
        position: 'relative',
        width: `${LIST_WIDTH}px`,
        '>input': {
          backgroundColor: '#cde',
          fontSize: '20px',
          fontWeight: 'bold',
          height: `${TITLE_HEIGHT}px`,
          padding: `${2 * PADDING}px ${3 * PADDING}px ${2 * PADDING}px ${3 * PADDING}px`,
          '[disabled]': {
            backgroundColor: '#ddd',
            color: '#888'
          }
        },
        '>svg': {
          backgroundColor: '#e32',
          borderRadius: '20px',
          cursor: 'pointer',
          fill: '#fff',
          right: '-5px',
          position: 'absolute',
          stroke: '#fff',
          top: '-5px'
        },
        [`>div.${CLASS_TODO_TASKS}`]: {
          maxHeight: `calc(100vh - ${TITLE_HEIGHT + 10 * PADDING + ADD_NEW_TASK_BUTTON_HEIGHT}px)`,
          overflowY: 'auto',
          scrollbarColor: `${SCROLLBAR_THUMB_COLOR} ${LIST_COLOR}`,
          '::-webkit-scrollbar-track': {
            background: SCROLLBAR_TRACK_COLOR
          },
          '::-webkit-scrollbar-thumb': {
            border: `solid ${SCROLLBAR_TRACK_COLOR} 2px`
          },
          [`>div.${CLASS_TODO_TASK}`]: {
            backgroundColor: LIST_COLOR,
            padding: `${2 * PADDING}px ${2 * PADDING}px 0 ${2 * PADDING}px`,
            position: 'relative',
            width: '100%',
            '>div': {
              backgroundColor: '#fff',
              borderRadius,
              display: 'block',
              fontSize: '16px',
              overflowWrap: 'break-word',
              padding: `${2 * PADDING}px`,
              whiteSpace: 'normal',
              width: '100%',
              wordWrap: 'break-word',
              ':not([contenteditable])': {
                backgroundColor: '#ddd',
                color: '#888',
                '>*': {
                  backgroundColor: '#ddd',
                  color: '#888'
                }
              }
            },
            '>svg': {
              backgroundColor: '#e32',
              borderRadius: '20px',
              cursor: 'pointer',
              fill: '#fff',
              right: '5px',
              position: 'absolute',
              stroke: '#fff',
              top: '5px'
            }
          }
        },
        '>button': {
          backgroundColor: '#0000',
          border: 'none',
          borderRadius,
          color: COLOR,
          fontSize: ADD_NEW_TASK_BUTTON_FONT_HEIGHT,
          height: `${ADD_NEW_TASK_BUTTON_HEIGHT}px`,
          margin: `${2 * PADDING}px`,
          textAlign: 'center',
          width: `${LIST_WIDTH - 4 * PADDING}px`,
          ':hover': {
            boxShadow: 'inset 0 0 0 42px #0001'
          },
          '>svg': {
            fill: COLOR,
            height: ADD_NEW_TASK_BUTTON_FONT_HEIGHT,
            marginRight: `${2 * PADDING}px`,
            stroke: COLOR,
            width: ADD_NEW_TASK_BUTTON_FONT_HEIGHT
          }
        }
      },
      '>button': {
        backgroundColor: '#0002',
        border: 'none',
        borderRadius,
        color: COLOR,
        fontSize: ADD_NEW_LIST_BUTTON_FONT_HEIGHT,
        fontWeight: 'bold',
        height: `${ADD_NEW_LIST_BUTTON_HEIGHT}px`,
        margin: `${PADDING}px`,
        textAlign: 'center',
        width: `${LIST_WIDTH}px`,
        ':hover': {
          boxShadow: 'inset 0 0 0 42px #0001'
        },
        '>svg': {
          fill: COLOR,
          height: ADD_NEW_LIST_BUTTON_FONT_HEIGHT,
          marginRight: `${2 * PADDING}px`,
          stroke: COLOR,
          width: ADD_NEW_LIST_BUTTON_FONT_HEIGHT
        }
      }
    }
  }
})
