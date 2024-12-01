console.log(solveA(require('fs').readFileSync('./16/input.txt', 'utf-8').replaceAll('\r', '')))

function solveA(input: string) {
    const valves = new Map(
      input.split('\n').map((l) => {
        const [currValve, flowRate, tunnels] = /Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)/.exec(l)?.slice(1) as [string, string, string]
        return [
          currValve,
          {
            id: currValve,
            flow: Number(flowRate),
            tunnels: tunnels.split(', '),
          },
        ]
      }),
    )
    const moves = [{ loc: 'AA', time: 30, pressureReleased: 0, opened: new Set(), log: new Array<string>() }]
    const seen = new Set<string>()
    const finals = []
    while (moves.length > 0) {
      const m = moves.shift()!
      const v = valves.get(m.loc)!
      if (m.time < 0) {
        continue
      }
      if (m.time === 0) {
        finals.push(m)
        continue
      }
      if (seen.has(`${m.loc}-${m.pressureReleased}-${JSON.stringify(m.opened.values())}`)) {
        continue
      }
      seen.add(`${m.loc}-${m.pressureReleased}-${JSON.stringify(m.opened.values())}`)
      // If we don't open the valve
      for (const loc of v.tunnels) {
        moves.push({
          loc,
          time: m.time - 1,
          pressureReleased: m.pressureReleased,
          opened: m.opened,
          log: [...m.log, `move ${loc}`],
        })
      }
      // If we open the valve
      if (!m.opened.has(v.id)) {
        const opened = new Set([v.id, ...m.opened.values()])
        const pressureReleased = m.pressureReleased + v.flow * (m.time - 1)
        for (const loc of v.tunnels) {
          moves.push({
            loc,
            time: m.time - 2,
            pressureReleased,
            opened,
            log: [...m.log, `open ${v.id}`, `move ${loc}`],
          })
        }
        // We can also choose to just stop moving
        //if (m.time >= 1) {
        //  finals.push(pressureReleased)
        //}
      }
      // console.log(moves.length)
    }
    finals.sort((a, b) => b.pressureReleased - a.pressureReleased)
    return finals[0]
  }