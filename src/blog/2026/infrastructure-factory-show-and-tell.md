---
title: "Your developers now build faster ⚡ The new bottleneck is the environment"
excerpt: |
   Max Körbächer presented The Infrastructure Factory at our Community Touchpoint show-and-tell. Watch the session and see why it matters for DevRel professionals who design hackathons, tech workshops, and demos.
author: "@anajsana, @mkorbi"
date: "2026-11-12"
tags: ["community"]
image: "/images/blog/2026/infrastructure-factory-show-and-tell.jpg"
---

At the November 11 Community Touchpoint, Max Körbächer presented **The Infrastructure Factory** as one of our first [show-and-tell sessions](/blog/2026/10/community-touchpoints-show-and-tell).

<iframe width="560" height="315" src="https://www.youtube.com/embed/J0oPv6MzraY" title="The Infrastructure Factory, with Max Körbächer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What the session covers

AI coding agents help developers write code faster. The environments that code needs to run have not kept up. In many organizations, a request for infrastructure still goes through tickets, meetings, and approvals.

Max describes the infrastructure factory as a way to close that gap. A person or an agent states what they need, and the platform delivers an environment that is ready to use. Each environment comes with:

- An owner and a cost center
- Policy checks that run before the environment is created
- A sandbox, because the output of an agent is not trusted by default
- Monitoring and backup
- An end date, so the environment expires when it is no longer needed

In the session, Max walks through:

- **The architecture:** An MCP server works as the front door, and a gateway works as the policy gate. Max shows agentgateway as an open source example.
- **The limits for agents:** An agent does not approve a request, change a policy, or delete an environment without its owner.

Max also notes that the infrastructure factory is a concept more than a finished product. Most organizations have some of the parts, and few have all of them.

## Takeaways for DevRel

This session sparked good conversations on why putting effort into an infrastructure factory, powered by MCP and [agentgateway](https://www.linkedin.com/company/agent-gateway/), can help DevRel professionals designing hackathons, tech workshops, or demos by avoiding losing time (and developer struggle) on setup, so participants can test right away the project they are there for.

The session closed with a message for our profession: your next developers are also agents.

- **Less setup, more learning:** With an environment on request, participants in hackathons, tech workshops, and demos start with the project, not with the installation steps.
- **Your documentation has a new reader:** Agents read documentation faster than anyone has written it. Tool descriptions and clear contracts are now part of your docs.
- **A "no" is a teaching moment:** For an agent, "no" means "reshape the request". The reason behind a refusal helps agents, and people, find the next step.


## What the community is working on

The call also included a few Foundation updates:

- Show-and-tell sessions now have their own place on the [Community Touchpoints page](/community/touchpoints), with the upcoming speakers and a form to submit yours
- A group of community members is planning a virtual unconference to define the DevRel Foundation priorities for 2027, with breakout rooms for each topic, and you can still propose a topic
- The community has also started to define how existing projects can be donated to the Foundation, because there is no documented process for that yet. You can follow that work, and share how your organization handles it, in the [GitHub discussion](https://github.com/DevRel-Foundation/governance/discussions/174) and on [Discord](https://discord.gg/G7CSTKZcuT)

## Resources shared

- [Watch the session on YouTube](https://youtu.be/J0oPv6MzraY)
- [Slides for this session](https://infrastructure-factory.com/presentations/devrel-foundation/)
- [The Infrastructure Factory website](https://infrastructure-factory.com/)
- [Source on GitHub](https://github.com/mkorbi/infrastructure-factory)

## Join the next Community Touchpoint

Community Touchpoints are open calls, every other Wednesday at 13:00 UTC.

Upcoming show-and-tell sessions:

- **November 25:** Kate Astrid, "From Slides to Websites"
- **December 9:** Raul Jimenez Ortega, "OpenTechEvents Specification"
- **December 16:** Waldek Mastykarz, "DevAX: how DevRel can use the Agent Experience Practitioner Playbook"

Find every session in the [community calendar](/calendar), and learn how to join on the [Community Touchpoints page](/community/touchpoints).

Do you have a workflow, a tool, or an experiment to share? [Submit a session](/community/touchpoints/submit).
