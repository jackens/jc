/**
 * Board page of simple self-hosted Trello/Wekan alternative app.
 */

import { $ } from './$.js'
import { app } from './app.js'
import { ASSIGN, BODY, EMPTY_STRING, VALUES } from './common.js'
import { ds } from './ds.js'
import { svgUse } from './svg-use.js'
import { CLASS_TODO_LIST, CLASS_TODO_TASK, CLASS_TODO_TASKS, LIST_WIDTH, PADDING, todoPageStyle } from '../style.js/todo-page.style.js'
import { _ } from './_.js'
import { _Element } from './_typeof.js'

const TODO = 'todo'
const COMMA = ','
const E = e => ({ e })

export const todoBoard = async () => {
  $({ e: app.svgElement, p: BODY })
  $({ e: todoPageStyle, p: BODY })

  const boardId = 1

  // const vBoard = oop(v, TODO, 'board')
  const dsList = ds(TODO, 'list', ['boardId', 'title', 'tasksOrder'])
  const dsTask = ds(TODO, 'task', ['listId', 'html'])
  const lists = await dsList.select({ boardId })
  const tasks = {}

  let activeTrashIconSvg

  const boardDiv = $({
    t: 'div',
    p: BODY,
    i: [{
      t: 'button',
      k: {
        onclick: async () => {
          const list = { boardId, title: EMPTY_STRING, tasksOrder: EMPTY_STRING }
          const ok = await dsList.insert(list)
          if (ok) {
            createList(list)
            list.input.focus()
          } else {
            // TODO
          }
        }
      },
      i: [svgUse('plus'), { e: _('Add new list') }]
    }]
  }).e

  const updateBoardDivWidth = () => $({
    e: boardDiv,
    k: {
      style: {
        width: `${2 * PADDING + (LIST_WIDTH + 2 * PADDING) * boardDiv.childNodes.length}px`
      }
    }
  })

  const ondragover = e => e.preventDefault()

  const setActiveTrashIconSvg = trashIconSvg => {
    if (activeTrashIconSvg !== undefined) {
      activeTrashIconSvg.style.display = 'none'
    }
    activeTrashIconSvg = trashIconSvg
    if (activeTrashIconSvg !== undefined) {
      activeTrashIconSvg.style.display = 'block'
    }
  }

  const createTask = task => {
    tasks[task.id] = task

    task.taskDiv = $({
      t: 'div',
      a: { contenteditable: true, draggable: 'true' },
      k: {
        innerHTML: task.html,
        onfocus: () => setActiveTrashIconSvg(task.trashIconSvg),
        oninput: () => dsTask.update(task, 'html', task.taskDiv.innerHTML),
        ondragover,
        ondragstart: e => {
          if (e.dataTransfer !== null) {
            e.dataTransfer.setData('text', task.id)
          }
        },
        ondrop: async e => {
          e.cancelBubble = true
          e.preventDefault()
          if (e.dataTransfer !== null) {
            const droppedTask = tasks[e.dataTransfer.getData('text')]
            const list = lists[task.listId]
            list.tasksDiv.insertBefore(droppedTask.taskWrapperDiv, task.taskWrapperDiv)
            await dsTask.update(droppedTask, 'listId', task.listId)
            await dsList.update(list, 'tasksOrder', list.updateTasksOrder())
            e.dataTransfer.clearData()
          }
        }
      }
    }).e

    task.trashIconSvg = $(svgUse('trash_circle', {
      a: { width: 20, height: 20 },
      k: {
        style: { display: 'none' },
        onclick: async () => {
          const ok = await deleteTask(task)
          if (!ok) {
            // TODO
          }
        }
      }
    })).e

    task.taskWrapperDiv = $({
      t: 'div',
      p: lists[task.listId].tasksDiv,
      a: { class: CLASS_TODO_TASK },
      k: {
        taskId: task.id,
        ondragover: task.taskDiv.ondragover,
        ondrop: task.taskDiv.ondrop
      },
      i: [task.taskDiv, task.trashIconSvg].map(E)
    }).e
  }

  const createList = list => {
    lists[list.id] = list

    list.input = $({
      t: 'input',
      a: { type: 'text' },
      k: {
        value: list.title,
        onfocus: () => setActiveTrashIconSvg(list.trashIconSvg),
        oninput: async () => await dsList.update(lists[list.id], 'title', list.input.value),
        ondragover
      }
    }).e

    list.trashIconSvg = $({
      ...svgUse('trash_circle', {
        a: { width: 20, height: 20 }
      }),
      k: {
        style: { display: 'none' },
        onclick: async () => {
          const confirmed = window.confirm(_('Do You really want to delete the list with all tasks?!?'))
          if (confirmed) {
            const ok = await deleteList(list)
            if (!ok) {
              // TODO: jakiś komunikat
            }
          }
        }
      }
    }).e

    list.tasksDiv = $({
      t: 'div',
      a: { class: CLASS_TODO_TASKS },
      k: {
        ondragover,
        ondrop: async e => {
          e.cancelBubble = true
          e.preventDefault()
          if (e.dataTransfer !== null) {
            const droppedTask = tasks[e.dataTransfer.getData('text')]
            $({ p: list.tasksDiv, e: droppedTask.taskWrapperDiv })
            list.updateTasksOrder()
            const ok1 = await dsTask.update(droppedTask, 'listId', list.id)
            const ok2 = await dsList.update(list, 'tasksOrder', list.tasksOrder)
            if (!ok1 || !ok2) {
              // TODO
            }
            e.dataTransfer.clearData()
          }
        }
      }
    }).e

    list.addNewTaskButton = $({
      t: 'button',
      k: {
        onclick: async () => {
          const task = { listId: list.id, html: EMPTY_STRING }
          const ok = await dsTask.insert(task)
          if (ok) {
            createTask(task)
            task.taskDiv.focus()
            const ok = await dsList.update(list, 'tasksOrder', list.updateTasksOrder())
            if (!ok) {
              // TODO
            }
          } else {
            // TODO
          }
        },
        ondragover,
        ondrop: list.tasksDiv.ondrop
      },
      i: [svgUse('plus'), { e: _('Add new task') }]
    }).e

    list.listDiv = $({
      t: 'div',
      a: { class: CLASS_TODO_LIST },
      k: { ondragover, ondrop: list.tasksDiv.ondrop },
      i: [list.input, list.trashIconSvg, list.tasksDiv, list.addNewTaskButton].map(E)
    }).e

    list.updateTasksOrder = () => (list.tasksOrder = Array.from(list.tasksDiv.childNodes).filter(_Element).map(element => element.taskId).join())

    boardDiv.insertBefore(list.listDiv, list.addNewListButton)

    updateBoardDivWidth()
  }

  const deleteTask = async task => {
    const list = lists[task.listId]
    list.tasksDiv.removeChild(task.taskWrapperDiv)
    const ok = await dsTask.delete(task)
    delete tasks[task.id]
    return ok
  }

  const deleteList = async list => {
    await Promise.all(VALUES(tasks).filter(task => task.listId === list.id).map(deleteTask))
    const ok = await dsList.delete(list)
    if (ok) {
      boardDiv.removeChild(list.listDiv)
      updateBoardDivWidth()
      delete lists[list.id]
    } else {
      // TODO
    }
  }

  for (const list of VALUES(lists)) {
    const { id: listId, tasksOrder } = list
    const tasksAtList = await dsTask.select({ listId })
    ASSIGN(tasks, tasksAtList)
    createList(list)
    tasksOrder.split(COMMA).filter(id => id in tasksAtList).forEach(id => {
      createTask(tasksAtList[id])
      delete tasksAtList[id]
    })
    VALUES(tasksAtList).forEach(createTask)
  }
}
