/**
 * `$` helper usage demo presenting simple Gantt Chart.
 */

import { $ } from './$.js'
import { BODY } from './common.js'

window.onload = () => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const PIXELS_PER_DAY = 42

  const tasks = [{
    taskName: 'Start',
    start: +new Date('2006-07-24'),
    duration: 0,
    color: '#e22'
  }, {
    taskName: 'a', predecessors: [0], duration: 4, color: '#e73'
  }, {
    taskName: 'b', predecessors: [0], duration: 5.33 + 2, color: '#fc3'
  }, {
    taskName: 'c', predecessors: [1], duration: 5.17 + 2, color: '#ad4'
  }, {
    taskName: 'd', predecessors: [1], duration: 6.33 + 4, color: '#4d9'
  }, {
    taskName: 'e', predecessors: [2, 3], duration: 5.17 + 2, color: '#3be'
  }, {
    taskName: 'f', predecessors: [4], duration: 4.5, color: '#45d'
  }, {
    taskName: 'g', predecessors: [5], duration: 5.17 + 2, color: '#c3e'
  }, {
    taskName: 'Finish', predecessors: [6, 7], duration: 0, color: '#e22'
  }]

  const midnight = (timestamp, offset) => {
    const date = new Date(timestamp)
    return Date.UTC(date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + offset)
  }

  tasks.forEach(task => {
    task.start = task.start ?? Math.max(...(task.predecessors ?? []).map(p => tasks[p].finish))
    task.finish = task.start + MILLISECONDS_PER_DAY * task.duration
  })

  let start = midnight(Math.min(...tasks.map(task => task.start)), -1)
  const finish = midnight(Math.max(...tasks.map(task => task.finish)), 1)
  const startPx = Math.round(PIXELS_PER_DAY * start / MILLISECONDS_PER_DAY)
  const finishPx = Math.round(PIXELS_PER_DAY * finish / MILLISECONDS_PER_DAY)

  tasks.forEach(task => {
    task.startPx = Math.round(PIXELS_PER_DAY * (task.start) / MILLISECONDS_PER_DAY) - startPx
    task.finishPx = Math.round(PIXELS_PER_DAY * (task.finish) / MILLISECONDS_PER_DAY) - startPx
  })

  const svg = {
    t: 'svg',
    p: BODY,
    a: {
      viewBox: `0 0 ${finishPx - startPx} ${42 * tasks.length - 10}`,
      width: `${finishPx - startPx}px`,
      height: `${42 * tasks.length - 10}px`
    },
    i: []
  }

  const svgI = svg.i

  while (start < finish) {
    const date = new Date(start)
    const weekDay = date.getUTCDay()

    svgI.push({
      t: 'rect',
      a: {
        fill: weekDay === 6 ? '#eef' : weekDay === 0 ? '#fee' : '#fff',
        stroke: '#000',
        'stroke-opacity': 0.2,
        x: Math.round(PIXELS_PER_DAY * start / MILLISECONDS_PER_DAY) - startPx,
        y: -2,
        width: PIXELS_PER_DAY,
        height: 42 * tasks.length + 4
      }
    })
    start += MILLISECONDS_PER_DAY
  }

  tasks.forEach((task, t) => (task.predecessors ?? []).forEach(p => svgI.push({
    t: 'path',
    a: {
      d: `M${tasks[p].finishPx},${42 * p + 16}Q${tasks[p].finishPx + 32},${42 * p + 16},${tasks[p].finishPx},${21 * (t + p) + 16}T${tasks[p].finishPx},${42 * t + 16}L${task.startPx},${42 * t + 16}`,
      stroke: task.color,
      'fill-opacity': 0,
      'stroke-linejoin': 'round',
      'stroke-width': 2
    }
  }, {
    t: 'path',
    a: {
      d: `M${task.startPx},${42 * t + 16}l-10,-4v8z`,
      stroke: task.color,
      fill: task.color,
      'stroke-linejoin': 'round',
      'stroke-width': 2
    }
  })))

  tasks.forEach((task, t) => {
    const bg = {
      t: 'rect', a: { fill: '#fff', rx: 3 }
    }

    const rect = {
      t: 'rect',
      a: {
        rx: 3,
        'stroke-width': 2,
        stroke: task.color,
        fill: task.color,
        'fill-opacity': 0.84
      },
      i: [{
        t: 'title', i: [{ e: task.taskName }]
      }]
    }

    const bgA = bg.a
    const rectA = rect.a

    if (task.finish !== task.start) {
      bgA.width = rectA.width = (task.finishPx) - (task.startPx)
      bgA.height = rectA.height = 32
      bgA.x = rectA.x = task.startPx
      bgA.y = rectA.y = 42 * t
    } else {
      bgA.width = rectA.width = 22
      bgA.height = rectA.height = 22
      bgA.x = rectA.x = (task.startPx) - 11 * task.duration
      bgA.y = rectA.y = 42 * t
      bgA.transform = rectA.transform = `rotate(45 ${task.startPx} ${42 * t})`
    }

    svgI.push(bg, rect, {
      t: 'text',
      a: {
        fill: '#111',
        'fill-opacity': 0.75,
        x: ((task.startPx) + (task.finishPx)) / 2,
        y: 42 * t + 21
      },
      k: {
        style: {
          fontFamily: 'Arial,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          textAnchor: 'middle',
          userSelect: 'none'
        }
      },
      i: [{ e: task.taskName }]
    })
  })

  $({
    t: 'h1',
    p: BODY,
    i: [{ e: 'Gantt chart ' }]
  })
  $({
    t: 'p',
    p: BODY,
    i: [{
      e: 'Conf. '
    }, {
      t: 'a',
      a: {
        target: '_blank',
        href: 'https://en.wikipedia.org/wiki/Gantt_chart#Example'
      },
      i: [{ e: 'https://en.wikipedia.org/wiki/Gantt_chart#Example' }]
    }]
  })
  $(svg)
}
