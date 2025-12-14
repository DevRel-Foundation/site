---
title: "A DevRel Guide to Google Tag Manager and Analytics | Tools Catalog"
excerpt: |
    Google Analytics gives insight into content performance when used in combination with Google Tag Manager.
author: "@devrel-foundation"
date: "2025-12-10"
category: "pro-lead"
tags: ["tools-catalog"]
image: "/images/blog/devrel-foundation-tools-catalog.png"
---

Creating technical content that helps developers to successfully adopt technology is a critical function for a number of deveeloper relations roles. This will take the form of a technical blog, product pages or documentation. One tool to help gain insight into the effectivness of content is [Google Analytics](/projects/tools-catalog/explore?tool=analytics.google.com) (GA4) and **Google Tag Manager (GTM)**.

In this article, you'll learn how to set up and manage [Google Analytics](/projects/tools-catalog/explore?tool=analytics.google.com) for your developer content, including some best practices and tips.

> **Contributing Authors**
> --- 
> 
> <br/>
> 
> Additional contributions to [this article](https://github.com/DevRel-Foundation/site/blob/main/src/blog/2025/10/tools-catalog-github-discussions.md) were made by: [dzeitman](https://github.com/dzeitman), [j12y](/blog/author/j12y)
> 
> <br/>
> 
> The DevRel Foundation [Tools Catalog](/projects/tools-catalog) was created to help explore tools that are beneficial to the practices of Developer Relations. It is more than a list, it is an open data repository that helps with evaluating and learning tools for DevRel.


## 1. Setting Up Google Analytics (GA4)


### Checklist of Recommendations


### Dealing with UTM


### Exporting Data



## 2. Setting Up Google Tag Manager (GTM)

To measure the effectivness of content you...

1. Install Google Tag Manager
2. Create events such as docs_page_view, tutorial_start, tutorial_complete
3. Mark tutorial_complete as a conversion


## 3. Insights from Analytics

The goal in using GA4 and demonstrating a higher maturity DevRel program would be going beyond purely measuring page views. Typically, a B2B or B2D website is not interested in impressions in the same way sites that are driven by advertising prioritize value. To succeed, DevRel teams need to prove impact.

### Measure: First Successful Event

When you get a new visitor to your site, you may be interested in intent signals. You can instrument these as tags for the 
events of interest to you.

### Measure: Download Rate or CTA

You may want to measure the download rate for a piece of content from a button or critical menu link...

### Measure: Tutorial Completion Rate

Scroll depth can be an indication of completion by firing an event when...

### Measure: Return Visitors

Knowing what percentage of visitors have visited multiple times within a period can tell you...

### Measure: Attention Hours

A complex metric like attention hours uses page views and time on page provide...

## 4. Take Action

Once you've gathered actionable insights about developer behaviors you can intrument repeatable workflows.

### Red Flag: High Traffic, Low Activation

Benchmarks for typical SaaS businesses:
* Seed
* Series A
* Series B
* Series C
* Series D

If you exceed benchmarks at the stage of growth but see activation rate below n % then onboarding may be unclear.

Look for content that has high traffic but under 2% conversion rate and prioritize this content for rewrites.

### Red Flag: High Tutorial Start, Low Completion

If you instrument GTM with tutorial_start and tutorial_end events you can calculate completion rate...

Ways to address this:
- tutorials should take less than 20 minutes to complete
- verify you are not missing steps and provide remediation advice should a step have a probability of error
- consider using a heatmapping tool and watch user behavior, see the [Tools Catalog](/projects/tools-catalog) for examples of this type of tool

### Red Flag: Low Traffic, High Activation

For content that has a high activation rate but low traffic volume, consider repurposing content into other formats like a video, tutorial, or talk...

## 5. Workflows

### Monthly: Content Reporting

Review your top performing blog post and let others know that...

### Quarterly: Content Pruning

Look for any content that has x or y characteristics... Consider archiving this content or updating it...


## Conclusion

When done well, you'll be able to tell executive stakeholders that content drove X percent more activations or reduced time-to-first success by Y percent as a result of your activities. This is the hallmark of a great DevRel program.



