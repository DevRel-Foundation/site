---
title: "Tools Catalog Moves to Incubation Stage"
excerpt: "The Tools Catalog project gathers digital and physical tools that aid in the job of DevRel."
author: "@j12y"
date: "2025-07-29"
category: "early-ic"
tags: ["tools-catalog"]
image: "/images/blog/devrel-foundation-tools-catalog.png"
---

For aspiring Developer Relations professionals who are trying to grow adoption using DevRel tactics, learning the tools of the trade is an important starting place to begin your journey. There are lists that rank and review tools but the sheer number of choices can be overwhelming. The [Tools Catalog](/projects/tools-catalog) initiative was started to collect physical and digital tools as open-data that map to specific day-to-day Developer Relations tasks.

The move to an **Incubation** stage indicates that this project has advanced beyond early sandbox and prototypes. Effort is underway and the beginnings of a tools definition schema are taking shape. This is the precursor to the _Graduation_ stage indicating today early adopters can start getting some immediate value, but there may still be shifts as feedback and contributions help it grow.

## Why Did We Need Yet Another Tool List?

It is not challenging to identify a list of available tools. There are things like [awesome-devrel](https://github.com/devrelcollective/awesome-devrel) which are well known and helpful.

The issue with lists like this is that they become:

- difficult to categorize because terminology is based on institutional knowledge
- difficult to evaluate tools (licensing, cost, interoperability)
- difficult to address bias from contributors
- don't help with learning how to use the tool effectively

In addition, some of these tool lists lack a governance model to help sustain them long-term. The [Tools Catalog](https://github.com/DevRel-Foundation/tools-catalog) project aims to take all of that into consideration and endorse a community standard data model so that tools can be organized around jobs to be done, specifically tasks that are common among Developer Relations roles.

## Categories are _Too_ Simple 

Categories are very simple to understand. _What should I use as a static site generator?_ 

The [Tools Catalog](https://github.com/DevRel-Foundation/tools-catalog) maintains that simplicity with `labels` but makes it a list instead of a string. For example, this website is built with Svelte. You could use Svelte to make a blog. You could use it to make a documentation website. You could use it to make a developer portal.

Many tools are not single-purpose, but when we create simple lists or oversimplify all those use cases with just one label like _static site generators_ we can miss the awareness and adoption challenges of new users.

By treating tools as open-data and generating lists for each label, we can help people who may think differently from us with discovery.

[Explore the Tools Catalog by label...](https://github.com/DevRel-Foundation/tools-catalog/tree/main/docs/index/by-label)

## DevRel Jobs to Be Done

Speaking of jobs. Given DevRel tends to be a cross-functional role, we aspire to define tools based on their usage pattern for DevRel tasks. What is the situation, motivation, or outcomes we're looking to achieve and what tools will help me get that job done.

> When I ...
>
> I want to ...
>
> so I can ...

I may not know that I need a static site generator, but if I know my role involves web development and the outcome I'm looking for is to create a website, that should lead me to the tools that would be most effective in reaching that DevRel goal.

The same is true for other job categories:

- Technical Writing
- Developer Marketing
- Graphic Design
- Public Speaking
- Business Travel

[Explore tools by job category...](https://github.com/DevRel-Foundation/tools-catalog/tree/main/docs/index/by-job-category)

## Choosing and Learning To Use Tools

Awareness is only half the battle. The other half is ~~red and blue lasers~~ the evaluation criteria and adoptability of the tool.

Take the [obsproject.com.json](https://github.com/DevRel-Foundation/tools-catalog/blob/main/data/obsproject.com.json) tool as an example:

```json
{
    ...,
    "learning": {
        "setup": [],
        "getting-started": [],
        "advanced": [
            {
                "type": "article",
                "title": "How-to Setup and Use Python with OBS on a Mac",
                "publish-date": "2023-10-20",
                "url": "https://dev.to/j12y/how-to-setup-and-use-python-with-obs-on-a-mac-1055"
            }
        ]
    }
}
```

You may have chosen OBS to create a video tutorial or host a live stream. Finding tutorials that explain in terms relevant for DevRel complete the adoption journey from setting up the tool, getting started level content, and advance use cases for applying the tool to DevRel objectives. 

To choose a tool in the first place, take [gatsbyjs.com.json](https://github.com/DevRel-Foundation/tools-catalog/blob/main/data/gatsbyjs.com.json) as an example:

```json
{
    ...,
    "evaluation": [
        {
            "decision": "past user",
            "pricing": "free open-source",
            "performance": "high",
            "compatibility": "framework",
            "customizability": ["plugins", "components", "themes", "config"],
            "notes": [
                "Difficult for non-technical users to contribute content without another CMS. Switched to Wordpress for ease of use by marketing groups.",
                "Significant customization requires deep expertise in dev team with Node, React and GraphQL."
            ]
        }

    ]
}
```

Often it is accepted that DevRel is an expensive team because of travel expenses but at the same time have insufficient budget for tools. Knowing some discrete criteria around pricing, customization, and subjective feedback can be really helpful in making a decision.


## Getting Started with the Tools Catalog

This project is still rough around the edges but has gotten off to a good start. 

- [x] open data
- [x] standard schema
- [x] validation tools
- [x] generation tools (to markdown)
- [x] [getting started](https://github.com/DevRel-Foundation/tools-catalog/blob/main/docs/guides/getting-started.md) and [contribution](https://github.com/DevRel-Foundation/tools-catalog/blob/main/CONTRIBUTING.md) guides

What comes next is up to you and the community.

- [ ] user interfaces (gui, llm) to view tools
- [ ] user interfaces (gui, llm) to add tools
- [ ] more tool data (evaluations, tutorials)

We also would really value having an advocate for this project who can act as a community ambassador, create video tutorials, and help gather feedback. 

[Join us](/join-us) in the next working group meeting to find out how you can contribute.
