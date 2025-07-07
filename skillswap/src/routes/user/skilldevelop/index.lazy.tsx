import SkillDevelop from '@/pages/skill-develop'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/skilldevelop/')({
  component: SkillDevelop,
})

function RouteComponent() {
  return <div>Hello "/user/skilldevelop/index/lzy"!</div>
}
